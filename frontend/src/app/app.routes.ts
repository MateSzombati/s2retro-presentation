import { Routes } from '@angular/router';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';
import { MsalGuard } from '@azure/msal-angular';
import { ControllingComponent } from './components/controlling/controlling.component';

export const routes: Routes = [
  {
    path: '',
    component: RestrictedPageComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'controlling', component: ControllingComponent },
];
