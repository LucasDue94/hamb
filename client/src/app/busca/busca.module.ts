import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuscaComponent} from './busca.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {PacienteInfoModule} from "../paciente-info/paciente-info.module";


@NgModule({
  declarations: [BuscaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
    PacienteInfoModule
  ]
})
export class BuscaModule { }
