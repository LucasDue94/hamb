import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AtendimentoRoutingModule} from './atendimento-routing.module';
import {AtendimentoComponent} from "./atendimento.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {CoreModule} from '../core/core.module';
import {FastSearchModule} from "../fast-search/fast-search.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AtendimentoComponent
  ],
  imports: [
    CommonModule,
    AtendimentoRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    CoreModule,
    FastSearchModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AtendimentoModule {
}
