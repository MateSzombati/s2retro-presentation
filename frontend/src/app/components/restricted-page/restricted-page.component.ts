import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { BoardDialogComponent, BoardData } from '../board-dialog/board-dialog.component';
import { interval, switchMap, catchError, of, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { UserInfoService } from '../../services/user-info.service';

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
  imports: [MatIconModule],
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css'],
})
export class RestrictedPageComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private userInfoService = inject(UserInfoService);
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private msal: MsalService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  // === State ===
  userName: string = 'User';
  boards: Board[] = [
    { name: 'Board 1', status: 'Completed' },
    { name: 'Board 2', status: 'Meeting Phase' },
    { name: 'Board 3', status: 'Entry Phase' },
  ];

  meetings: GraphEvent[] = [];
  notifications: GraphChat[] = [];
  contacts: { id: string; name: string; photoUrl?: string }[] = [];

  todayMeetings = 0;
  adminChanges = 0;
  loadingMeetings = false;
  loadingNotifications = false;

  // === Lifecycle ===
  ngOnInit(): void {
    this.subscribeToUserInfo();

    this.ensureActiveAccount();
    Promise.all([
      this.loadUpcomingMeetings(),
      this.loadRecentContacts(),
    ]);

    this.startNotificationsPolling();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  private subscribeToUserInfo(): void {
    this.userInfoService.currentUserInfo$
      .pipe(takeUntil(this._destroying$))
      .subscribe(userClaims => {
        if (userClaims && userClaims.claims) {
          const nameClaim = userClaims.claims.find(c => c.type === 'name');
          console.log(nameClaim);
          this.userName = nameClaim?.value ?? 'unknown';
        }
      });
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
  addBoard(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: { name: '', status: '' } as BoardData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boards.push(result);
      }
    });
  }

  get openBoards(): number {
    return this.boards.filter((b) => b.status !== 'Completed').length;
  }

  // === Graph API: Meetings ===
  private async loadUpcomingMeetings(): Promise<void> {
    this.loadingMeetings = true;
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
      this.meetings = res?.value ?? [];

      // Meetings Heute zählen
      const todayYMD = this.toYMD(new Date(), 'Europe/Vienna');
      this.todayMeetings = this.meetings.filter(
        (ev) => this.toYMD(new Date(ev.start.dateTime), 'Europe/Vienna') === todayYMD
      ).length;
    } catch (err) {
      console.error('Failed to load meetings', err);
    } finally {
      this.loadingMeetings = false;
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
    this.loadingNotifications = true;
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
      this.notifications = res?.value ?? [];
    } catch (err) {
      console.error('Failed to load notifications', err);
    } finally {
      this.loadingNotifications = false;
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
        this.notifications = (res.value ?? []).filter(chat =>
          chat.lastMessagePreview?.from?.user?.id &&
          chat.lastMessagePreview.from.user.id !== account.localAccountId
        );
      });

    }).catch(err => {
      console.error('Could not retrieve token', err);
    });
  }

  // === Graph API: Kontakte ===
  private async loadRecentContacts(): Promise<void> {
    try {
      const account = this.msal.instance.getActiveAccount();
      if (!account) return;

      // Token für Teams-Chat
      const { accessToken } = await this.msal.instance.acquireTokenSilent({
        scopes: ['Chat.Read'],
        account,
      });

      const url = `https://graph.microsoft.com/v1.0/me/chats?$expand=members,lastMessagePreview&$top=10`;
      const headers = new HttpHeaders({ Authorization: `Bearer ${accessToken}` });

      const res = await firstValueFrom(
        this.http.get<{ value: GraphChat[] }>(url, { headers })
      );
      const chats = res?.value ?? [];

      // Mitglieder extrahieren (außer man selbst)
      const members = chats.flatMap((chat) =>
        (chat.members ?? [])
          .filter((m) => m.user && m.user.id !== account.localAccountId)
          .map((m) => ({ id: m.user!.id, name: m.user!.displayName }))
      );

      // Doppelte rausfiltern
      const unique = members.filter(
        (m, i, arr) => arr.findIndex((x) => x.id === m.id) === i
      );

      // Fotos laden
      this.contacts = await Promise.all(
        unique.map(async (u) => {
          try {
            const blob = await firstValueFrom(
              this.http.get(`https://graph.microsoft.com/v1.0/users/${u.id}/photo/$value`, {
                headers,
                responseType: 'blob',
              })
            );
            return { ...u, photoUrl: URL.createObjectURL(blob!) };
          } catch {
            return u; // Fallback without photo
          }
        })
      );
    } catch (err) {
      console.error('Failed to load contacts', err);
    }
  }
}