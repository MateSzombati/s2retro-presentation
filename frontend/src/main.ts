import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ControllingComponent } from './app/components/controlling/controlling.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'controlling', pathMatch: 'full' },
      { path: 'controlling', component: ControllingComponent }
    ])
  ]
}).catch(err => console.error(err));