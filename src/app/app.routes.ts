import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [NonAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];
