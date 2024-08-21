import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCaseComponent } from './pages/add-case/add-case.component';

const routes: Routes = [
  {path: '',
    component: AddCaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouterCaseRoutingModule { }

