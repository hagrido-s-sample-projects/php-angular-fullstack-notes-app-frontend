import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { HomeComponent as DashboardHomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

export const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [NonAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      // TODO: Add other dashboard routes here
    ]
  },
];
