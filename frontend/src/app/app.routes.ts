import { Routes } from '@angular/router';
import { ControllingComponent } from '../app/components/controlling/controlling.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'controlling', component: ControllingComponent },
];
