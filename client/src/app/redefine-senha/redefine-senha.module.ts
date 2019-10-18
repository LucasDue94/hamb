import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedefineSenhaRoutingModule } from './redefine-senha-routing.module';
import {RedefineSenhaComponent} from "./redefine-senha.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    RedefineSenhaComponent
  ],
  imports: [
    CommonModule,
    RedefineSenhaRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class RedefineSenhaModule { }
