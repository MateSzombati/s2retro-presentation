import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { BASE_PATH as CORE_BASE_PATH } from './swagger';
import { BASE_PATH as CORE2_BASE_PATH } from './swagger2';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    { provide: CORE_BASE_PATH, useValue: 'http://localhost:8080' },
    { provide: CORE2_BASE_PATH, useValue: 'http://localhost:8081' },
  ],
};
