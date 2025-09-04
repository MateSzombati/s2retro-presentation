import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { PopupRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginComponent {
  constructor(private msalService: MsalService, private router: Router){

  }

  isLoggedIn() : boolean{
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginPopup({
      scopes: ['User.Read', 'User.ReadBasic.All','Calendars.Read','Chat.Read'] // evtl. weitere Scopes für Graph
    }).subscribe({
      next: (result) => {
        console.log('Erfolgreich eingeloggt', result);

        // 👉 Hier aktiven Account setzen
        if (result.account) {
          this.msalService.instance.setActiveAccount(result.account);
        }

        this.router.navigate(['./restricted-page']);
      },
      error: (error) => console.error('Login-Fehler', error),
    });
  }

  ngOnInit(): void {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (!activeAccount) {
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(accounts[0]);
      }
    }
  }
}