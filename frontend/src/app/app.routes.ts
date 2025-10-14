import { Routes } from '@angular/router';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';
import { CreateRetroboardComponent } from './components/create-retroboard/create-retroboard.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
  {
    path: '',
    component: RestrictedPageComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'createboard',
    component: CreateRetroboardComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
