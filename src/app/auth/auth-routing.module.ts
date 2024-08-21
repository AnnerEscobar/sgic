import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingRoutingModule } from './auth-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule,
    HttpClientModule
  ],
  exports:[
  ]
})
export class AuthRoutingModule { }
