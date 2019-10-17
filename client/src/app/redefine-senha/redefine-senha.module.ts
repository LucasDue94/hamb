import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedefineSenhaRoutingModule } from './redefine-senha-routing.module';
import {RedefineSenhaComponent} from "./redefine-senha.component";


@NgModule({
  declarations: [
    RedefineSenhaComponent
  ],
  imports: [
    CommonModule,
    RedefineSenhaRoutingModule
  ]
})
export class RedefineSenhaModule { }
