import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout.component';
import { HomeComponent as DashboardHomeComponent } from './dashboard/home/home.component';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent,
    canActivate: [nonAuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [nonAuthGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [nonAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      // TODO: Add other dashboard routes here
    ]
  },
  {
    path: 'note/:id',
    component: NoteComponent,
    canActivate: [authGuard]
  },
];
