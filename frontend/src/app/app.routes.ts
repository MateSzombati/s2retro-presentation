import { Routes } from '@angular/router';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: RestrictedPageComponent,
    canActivate: [MsalGuard], // Schützt die Route mit dem offiziellen MSAL Guard
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
