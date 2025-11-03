import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { BASE_PATH } from './swagger';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideHttpClient(),
      { provide: BASE_PATH, useValue: environment.apiRoot },
  ]
};
