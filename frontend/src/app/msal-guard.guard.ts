import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

export const msalGuardGuard: CanActivateFn = (route, state) => {
  const msalService = inject(MsalService);
  const router = inject(Router);

  const isLoggedIn = msalService.instance.getAllAccounts().length > 0;

  if (isLoggedIn) {
    return true;
  } else {
    // Optional: Login automatisch starten
    msalService.loginRedirect({
      scopes: ['user.read'],
      redirectStartPage: state.url
    });

    return false;
  }
};
