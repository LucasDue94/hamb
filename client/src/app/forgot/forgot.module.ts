import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import {ForgotComponent} from "./forgot.component";


@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ForgotRoutingModule
  ]
})
export class ForgotModule { }
