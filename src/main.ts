import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/store/auth/auth.reducer';
import { AuthEffects } from './app/store/auth/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './enviroment/enviroment';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
}).catch(err => {
  console.error('Error during bootstrap:', err);
  console.error('Stack trace:', err.stack);
});
