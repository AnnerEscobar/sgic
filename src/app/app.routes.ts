import { LoginComponent } from './auth/login/login.component';
import { Routes } from '@angular/router';
import { AddCaseComponent } from './add-case/add-case.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agregar-caso', component: AddCaseComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: '**', component: PageNotFoundComponent }

];
