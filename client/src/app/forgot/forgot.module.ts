import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import {ForgotComponent} from "./forgot.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    ForgotRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ForgotModule { }
