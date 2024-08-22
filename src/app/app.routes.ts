import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./dashboard/dash-routing.module').then(m => m.DashRoutingModule),
  },
  {
    path: 'add-case',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./add-case/router-case.module').then(m => m.RouterCaseModule)
  },
  {
    path: 'stadistics',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./estadisticas/router-stadistics.module').then(m => m.RouterStadisticsModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },

];
