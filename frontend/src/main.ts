import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { AppRouteProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

(async () => {
  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: '1c9d09b3-c2b9-45b4-8b0d-11ee2ed6c315',
      authority: 'https://login.microsoftonline.com/s2g.at',
      redirectUri: 'http://localhost:4200'
    }
  });

  await msalInstance.initialize();

  await bootstrapApplication(AppComponent, {
    providers: [
      ...AppRouteProviders,
      provideHttpClient(),
      importProvidersFrom(
        MsalModule,
      ),
      {
        provide: MSAL_INSTANCE,
        useValue: msalInstance
      },
      MsalService
    ]
  });
})();
