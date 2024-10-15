import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './app/store/auth/auth.reducer';
import { AuthEffects } from './app/store/auth/auth.effects';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient()
  ],
}).catch(err => {
  console.error('Error during bootstrap:', err);
  console.error('Stack trace:', err.stack);
});
