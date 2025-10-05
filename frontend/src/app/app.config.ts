// app.config.ts
// This file configures the Angular application, including routing, HTTP client, and Microsoft Authentication Library (MSAL) setup.
// It defines how MSAL interacts with Azure Active Directory (AAD) for authentication and token acquisition.

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  MsalModule,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

/**
 * Creates the MSAL PublicClientApplication instance.
 * This configures the core MSAL settings for interacting with Azure AD.
 */
export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // IMPORTANT: This should be the Client ID of the FRONTEND application in Azure Entra ID (formerly Azure AD),
      // NOT the Backend API's Client ID. Please replace with the correct ID.
      clientId: '1c9d09b3-c2b9-45b4-8b0d-11ee2ed6c315',
      authority: 'https://login.microsoftonline.com/1e4f97fa-5466-4155-97b0-a3eef3984fb0/', // The Azure AD tenant authority.
      redirectUri: 'http://localhost:4200', // The URI where Azure AD redirects after authentication.
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage, // Stores tokens in browser's local storage.
    },
    system: {
      loggerOptions: {
        loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error: console.error(message); break;
            case LogLevel.Info: console.info(message); break;
            case LogLevel.Verbose: console.debug(message); break;
            case LogLevel.Warning: console.warn(message); break;
          }
        },
        logLevel: LogLevel.Info, // Set to LogLevel.Verbose for detailed MSAL logging.
      },
    },
  });
}

/**
 * Configuration for the MSAL Guard.
 * The MsalGuard protects routes and ensures a user is authenticated before accessing them.
 */
export function MSALGuardConfigFactory() {
  return {
    interactionType: InteractionType.Redirect, // Specifies the interaction type for authentication (redirect or popup).
    authRequest: {
      scopes: [
        'User.Read', // Default scope for reading basic user profile information.
        'api://e5f836ee-dd93-4bd1-b36c-61235078e367/access_as_user', // Scope for accessing the custom backend API.
      ],
    },
  };
}

/**
 * Configuration for the MSAL Interceptor.
 * The MsalInterceptor automatically acquires and attaches access tokens to outgoing HTTP requests
 * for specified protected resources.
 */
export function MSALInterceptorConfigFactory() {
  const protectedResourceMap = new Map<string, Array<string> | null>();
  // Maps the backend API URL to the required scope.
  // Any HTTP request to environment.apiUrl will have an access token for 'access_as_user' scope attached.
  protectedResourceMap.set(
    environment.apiUrl,
    ['api://e5f836ee-dd93-4bd1-b36c-61235078e367/access_as_user']
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

/**
 * The main application configuration.
 * Defines providers for routing, HTTP client, and MSAL services.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Provides HttpClient and enables interceptors for dependency injection.
    provideHttpClient(withInterceptorsFromDi()),
    {
      // Registers MsalInterceptor as an HTTP interceptor to handle token acquisition.
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    // Imports MsalModule and provides its core services.
    importProvidersFrom(MsalModule),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService, // Core MSAL service.
    MsalGuard, // Route guard for authentication.
    MsalBroadcastService, // Service for listening to MSAL events.
  ],
};
