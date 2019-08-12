import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRoutingModule } from './historico-routing.module';
import {HistoricoComponent} from "./historico.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    HistoricoComponent
  ],
  imports: [
    CommonModule,
    HistoricoRoutingModule,
    FontAwesomeModule,
    InfiniteScrollModule
  ]
})
export class HistoricoModule { }
