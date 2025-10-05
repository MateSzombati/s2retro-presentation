import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { firstValueFrom } from 'rxjs'; // ersetzt toPromise()

// Data interface for the dialog input
export interface BoardData {
  name: string;
  status: string;
}

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule
  ],
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.css'], // FIX: Angular expects "styleUrls" (plural)
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ]
})
export class BoardDialogComponent {
  
  // Form-Felder & State
  boardName: string = '';
  layout: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  searchInput: string = '';
  participants: { name: string; email: string; role: string; photo?: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BoardData,
    private http: HttpClient,
    private msalService: MsalService
  ) {}

  /**
   * Searches for users in Microsoft Graph based on the input
   */
  async searchUser(): Promise<any> {
    const account = this.msalService.instance.getActiveAccount();

    if (!account) {
      throw new Error('No active account set - please log in first.');
    }

    // Get token for Graph API
    const token = await this.msalService.instance.acquireTokenSilent({
      scopes: ['User.ReadBasic.All'],
      account
    });

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token.accessToken}`
    });

    // firstValueFrom instead of deprecated toPromise()
    return firstValueFrom(
      this.http.get<any>(
        `https://graph.microsoft.com/v1.0/users?$filter=startswith(displayName,'${this.searchInput}') or startswith(mail,'${this.searchInput}')`,
        { headers }
      )
    );
  }

  /**
   * Adds a participant based on the search
   */
  async addParticipant() {
    if (!this.searchInput) return;

    try {
      const result = await this.searchUser();
      if (!result.value || result.value.length === 0) return;

      const user = result.value[0]; // Take the first hit
      let photoUrl: string | undefined;

      try {
        // Get new token for access to photos
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

      this.searchInput = ''; // Reset input
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }

  /**
   * Closes the dialog without changes
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Closes the dialog and returns the data
   */
  onSave(): void {
    this.dialogRef.close({
      name: this.boardName,
      status: this.layout,
      start: this.startDate,
      end: this.endDate,
      participants: this.participants
    });
  }
}
