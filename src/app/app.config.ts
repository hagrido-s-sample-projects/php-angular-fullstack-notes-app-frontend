import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: true }),
    provideHttpClient(withFetch()),
    AuthService,
  ]
};
