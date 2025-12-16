import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Diese Struktur sollte dem JSON-Response vom Backend entsprechen
export interface UserClaims {
  name: string;
  claims: { type: string; value: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private readonly _userInfo = new BehaviorSubject<UserClaims | null>(null);

  /** Observable, um auf Änderungen der Benutzerinformationen zu reagieren. */
  readonly currentUserInfo$ = this._userInfo.asObservable();

  constructor() { }

  /**
   * Speichert die abgerufenen Benutzerinformationen.
   * @param info Die vom Backend erhaltenen Benutzerinformationen.
   */
  setUserInfo(info: UserClaims | null): void {
    this._userInfo.next(info);
  }

  /**
   * Gibt den aktuellen Wert der Benutzerinformationen zurück.
   */
  getCurrentUserInfo(): UserClaims | null {
    return this._userInfo.getValue();
  }
}
