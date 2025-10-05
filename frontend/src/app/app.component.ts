import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { UserInfoService, UserClaims } from './services/user-info.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.INITIALIZE_END ||
            msg.eventType === EventType.LOGIN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        if (this.msalService.instance.getAllAccounts().length > 0) {
          this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
        }
        // After login or initialization, if there's an active account, get user info
        if (this.msalService.instance.getActiveAccount()) {
          this.getUserInfoFromBackend();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  getUserInfoFromBackend(): void {
    // The MsalInterceptor attaches the token automatically.
    this.http.get<UserClaims>(`${environment.apiUrl}/api/Authentication`).subscribe({
      next: (info) => {
        // Store the fetched info in the shared service
        this.userInfoService.setUserInfo(info);
        console.log('User Info from Backend stored in service:', info);
      },
      error: (err) => {
        console.error('Failed to get user info from backend', err);
        // Clear user info on error
        this.userInfoService.setUserInfo(null);
      },
    });
  }

  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}