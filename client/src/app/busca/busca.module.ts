import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuscaComponent} from './busca.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";
import {SpinnerModule} from "../spinner/spinner.module";


@NgModule({
  declarations: [BuscaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    PacienteInfoModule,
    SpinnerModule
  ]
})
export class BuscaModule { }
