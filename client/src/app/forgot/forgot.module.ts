import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ForgotRoutingModule
  ]
})
export class ForgotModule { }
