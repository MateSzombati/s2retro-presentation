import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { interval, switchMap, catchError, of, firstValueFrom, Subject } from 'rxjs';
import { UserInfoService } from '../../services/user-info.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChartComponent } from '../chart/chart.component';


// ==== Models / Types ====
interface Board {
  name: string;
  status: string;
  start?: Date;
  end?: Date;
  participants?: { name: string; email: string; role: string }[];
}

type GraphEvent = {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  isAllDay?: boolean;
  onlineMeetingUrl?: string;
};

type GraphChat = {
  id: string;
  topic?: string;
  lastMessagePreview?: {
    createdDateTime: string;
    from: { user: { id: string; displayName: string } };
    body: { content: string };
  };
  members?: {
    user?: {
      id: string;
      displayName: string;
      userIdentityType: string;
    };
  }[];
};

// ==== Component ====
@Component({
  selector: 'app-restricted-page',
  standalone: true,
  imports: [MatIconModule, ChartComponent],
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css'],
})
export class RestrictedPageComponent implements OnInit {
  private http = inject(HttpClient);
  private userInfoService = inject(UserInfoService);

  constructor(
    private msal: MsalService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  // === State ===
  private userClaimsSignal = toSignal(this.userInfoService.currentUserInfo$);
  userName = computed(() => {
    const claims = this.userClaimsSignal();
    const nameClaim = claims?.claims?.find(c => c.type === 'name');
    return nameClaim?.value ?? 'User';
  });
  boards = signal<Board[]>([
    { name: 'Board 1', status: 'Completed' },
    { name: 'Board 2', status: 'Meeting Phase' },
    { name: 'Board 3', status: 'Entry Phase' },
  ]);

  meetings = signal<GraphEvent[]>([]);
  notifications = signal<GraphChat[]>([]);

  todayMeetings = signal(0);
  adminChanges = signal(0);
  loadingMeetings = signal(false);
  loadingNotifications = signal(false);

  // === Lifecycle ===
  ngOnInit(): void {
    this.ensureActiveAccount();
    Promise.all([
      this.loadUpcomingMeetings(),
    ]);

    this.startNotificationsPolling();
  }


  // === Auth Helpers ===
  private ensureActiveAccount(): void {
    if (!this.msal.instance.getActiveAccount()) {
      const accounts = this.msal.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msal.instance.setActiveAccount(accounts[0]);
      }
    }
  }

  // === Board Management ===

  openBoards = computed(() => this.boards().filter((b) => b.status !== 'Completed').length);

  // === Graph API: Meetings ===
  private async loadUpcomingMeetings(): Promise<void> {
    this.loadingMeetings.set(true);
    try {
      const account = this.msal.instance.getActiveAccount();
      if (!account) return;

      // Token für Kalender
      const { accessToken } = await this.msal.instance.acquireTokenSilent({
        scopes: ['Calendars.Read'],
        account,
      });

      // Zeitraum jetzt bis + 7 Tage
      const now = new Date();
      const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const url = `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${encodeURIComponent(
        now.toISOString()
      )}&endDateTime=${encodeURIComponent(
        in7Days.toISOString()
      )}&$orderby=start/dateTime&$top=25`;

      const headers = new HttpHeaders({
        Authorization: `Bearer ${accessToken}`,
        Prefer: 'outlook.timezone="Europe/Vienna"',
      });

      const res = await firstValueFrom(
        this.http.get<{ value: GraphEvent[] }>(url, { headers })
      );
      this.meetings.set(res?.value ?? []);

      // Meetings Heute zählen
      const todayYMD = this.toYMD(new Date(), 'Europe/Vienna');
      this.todayMeetings.set(this.meetings().filter(
        (ev) => this.toYMD(new Date(ev.start.dateTime), 'Europe/Vienna') === todayYMD
      ).length);
    } catch (err) {
      console.error('Failed to load meetings', err);
    } finally {
      this.loadingMeetings.set(false);
    }
  }

  formatTime(dateTime: string): string {
    return new Intl.DateTimeFormat('de-AT', {
      timeZone: 'Europe/Vienna',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateTime));
  }

  private toYMD(d: Date, tz: string): string {
    const y = new Intl.DateTimeFormat('de-AT', { timeZone: tz, year: 'numeric' }).format(d);
    const m = new Intl.DateTimeFormat('de-AT', { timeZone: tz, month: '2-digit' }).format(d);
    const day = new Intl.DateTimeFormat('de-AT', { timeZone: tz, day: '2-digit' }).format(d);
    return `${y}-${m}-${day}`;
  }

  // === Graph API: Notifications ===
  private async loadNotifications(): Promise<void> {
    this.loadingNotifications.set(true);
    try {
      const account = this.msal.instance.getActiveAccount();
      if (!account) return;

      // Token für Teams-Chat
      const { accessToken } = await this.msal.instance.acquireTokenSilent({
        scopes: ['Chat.Read'],
        account,
      });

      const url = `https://graph.microsoft.com/v1.0/me/chats?$expand=lastMessagePreview&$top=10`;
      const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });

      const res = await firstValueFrom(
        this.http.get<{ value: GraphChat[] }>(url, { headers })
      );
      this.notifications.set(res?.value ?? []);
    } catch (err) {
      console.error('Failed to load notifications', err);
    } finally {
      this.loadingNotifications.set(false);
    }
  }

  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  private startNotificationsPolling(): void {
    const account = this.msal.instance.getActiveAccount();
    if (!account) return;

    // Token für Teams-Chat abrufen
    this.msal.instance.acquireTokenSilent({
      scopes: ['Chat.Read'],
      account,
    }).then(({ accessToken }) => {
      const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
      const url = `https://graph.microsoft.com/v1.0/me/chats?$expand=lastMessagePreview&$top=10`;

      // Alle 10 Sekunden Graph API abfragen
      interval(10000).pipe(
        switchMap(() =>
          this.http.get<{ value: GraphChat[] }>(url, { headers }).pipe(
            catchError(err => {
              console.error('Error loading notifications', err);
              return of({ value: [] as GraphChat[] });
            })
          )
        )
      ).subscribe(res => {
        this.notifications.set((res.value ?? []).filter(chat =>
          chat.lastMessagePreview?.from?.user?.id &&
          chat.lastMessagePreview.from.user.id !== account.localAccountId
        ));
      });

    }).catch(err => {
      console.error('Could not retrieve token', err);
    });
  }
}