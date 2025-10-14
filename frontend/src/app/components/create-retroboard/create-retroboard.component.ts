import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-retroboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-retroboard.component.html',
  styleUrl: './create-retroboard.component.scss',
})
export class CreateRetroboardComponent {
  boardName: string = '';
  layout: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  searchInput: string = '';
  participants: { name: string; email: string; role: string; photo?: string }[] = [];

  constructor(
    private http: HttpClient,
    private msalService: MsalService,
    private router: Router
  ) {}

  async searchUser(): Promise<any> {
    const account = this.msalService.instance.getActiveAccount();

    if (!account) {
      throw new Error('No active account set - please log in first.');
    }

    const token = await this.msalService.instance.acquireTokenSilent({
      scopes: ['User.ReadBasic.All'],
      account
    });

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token.accessToken}`
    });

    return firstValueFrom(
      this.http.get<any>(
        `https://graph.microsoft.com/v1.0/users?$filter=startswith(displayName,'${this.searchInput}') or startswith(mail,'${this.searchInput}')`,
        { headers }
      )
    );
  }

  async addParticipant() {
    if (!this.searchInput) return;

    try {
      const result = await this.searchUser();
      if (!result.value || result.value.length === 0) return;

      const user = result.value[0];
      let photoUrl: string | undefined;

      try {
        const token = await this.msalService.instance.acquireTokenSilent({
          scopes: ['User.Read'],
          account: this.msalService.instance.getActiveAccount()!
        });

        const photoBlob = await firstValueFrom(
          this.http.get(
            `https://graph.microsoft.com/v1.0/users/${user.id}/photo/$value`,
            { responseType: 'blob', headers: { Authorization: `Bearer ${token.accessToken}` } }
          )
        );

        if (photoBlob) {
          photoUrl = URL.createObjectURL(photoBlob);
        }
      } catch (photoError: any) {
        if (photoError.status === 404) {
          console.warn(`No profile picture for ${user.displayName}`);
        } else {
          console.error('Error loading profile picture', photoError);
        }
      }

      this.participants.push({
        name: user.displayName,
        email: user.mail || user.userPrincipalName,
        role: 'User',
        photo: photoUrl
      });

      this.searchInput = '';
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  saveBoard(): void {
    const boardData = {
      name: this.boardName,
      status: this.layout,
      start: this.startDate,
      end: this.endDate,
      participants: this.participants
    };
    console.log(boardData);
    // Here you would typically save the data to a service
    this.router.navigate(['/']);
  }
}
