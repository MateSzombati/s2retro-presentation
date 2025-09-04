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

// Datenschnittstelle für die Dialogeingabe
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
  styleUrls: ['./board-dialog.component.css'], // FIX: Angular erwartet "styleUrls" (Plural)
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
   * Sucht nach Benutzern im Microsoft Graph anhand der Eingabe
   */
  async searchUser(): Promise<any> {
    const account = this.msalService.instance.getActiveAccount();

    if (!account) {
      throw new Error('Kein aktiver Account gesetzt – bitte erst einloggen.');
    }

    // Token für Graph API abrufen
    const token = await this.msalService.instance.acquireTokenSilent({
      scopes: ['User.ReadBasic.All'],
      account
    });

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token.accessToken}`
    });

    // firstValueFrom statt deprecated toPromise()
    return firstValueFrom(
      this.http.get<any>(
        `https://graph.microsoft.com/v1.0/users?$filter=startswith(displayName,'${this.searchInput}') or startswith(mail,'${this.searchInput}')`,
        { headers }
      )
    );
  }

  /**
   * Fügt einen Teilnehmer basierend auf der Suche hinzu
   */
  async addParticipant() {
    if (!this.searchInput) return;

    try {
      const result = await this.searchUser();
      if (!result.value || result.value.length === 0) return;

      const user = result.value[0]; // Ersten Treffer nehmen
      let photoUrl: string | undefined;

      try {
        // Neuen Token für Zugriff auf Fotos abrufen
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
          console.warn(`Kein Profilbild für ${user.displayName}`);
        } else {
          console.error('Fehler beim Laden des Profilbilds', photoError);
        }
      }

      this.participants.push({
        name: user.displayName,
        email: user.mail || user.userPrincipalName,
        role: 'Benutzer',
        photo: photoUrl
      });

      this.searchInput = ''; // Eingabe zurücksetzen
    } catch (err) {
      console.error('Fehler beim Hinzufügen des Benutzers:', err);
    }
  }

  /**
   * Schließt den Dialog ohne Änderungen
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Schließt den Dialog und gibt die Daten zurück
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
