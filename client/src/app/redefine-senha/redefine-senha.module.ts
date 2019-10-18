import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RedefineSenhaComponent} from "./redefine-senha.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    RedefineSenhaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class RedefineSenhaModule { }
