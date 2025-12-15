import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Students } from './components/students/students';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'students', component: Students , canActivate: [AuthGuard]  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];
