import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaRoutingModule} from './agenda-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {AgendaListComponent} from './agenda-list.component';
import {AgendaShowComponent} from "./agenda-show/agenda-show.component";
import {RouterModule} from "@angular/router";
import {AgendaComponent} from "./agenda.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    RouterModule,
    InfiniteScrollModule
  ],
  declarations: [AgendaListComponent, AgendaShowComponent, AgendaComponent]
})
export class AgendaModule {
}
