import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './app/store/auth/auth.reducer';
import { AuthEffects } from './app/store/auth/auth.effects';
import { environment } from './enviroment/enviroment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
});

