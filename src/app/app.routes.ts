import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dash-routing.module').then(m => m.DashRoutingModule),
  },
  {
    path: 'add-case',
    loadChildren: () => import('./add-case/router-case.module').then(m => m.RouterCaseModule)
  },
  {
    path: 'stadistics',
    loadChildren: () => import('./estadisticas/router-stadistics.module').then(m => m.RouterStadisticsModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },



];
