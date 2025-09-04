import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { RestrictedPageComponent } from '../app/components/restricted-page/restricted-page.component';
import { msalGuardGuard } from './msal-guard.guard';
import { LoginComponent } from '../app/components/login-page/login-page.component';



export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'restricted-page',
    component: RestrictedPageComponent,
    canActivate: [msalGuardGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

// Exportiere auch die Provider für main.ts
export const AppRouteProviders = [provideRouter(routes)];
