import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaRoutingModule} from './agenda-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {AgendaListComponent} from './agenda-list.component';
import {AgendaShowComponent} from "./agenda-show/agenda-show.component";
import {RouterModule} from "@angular/router";
import {CoreModule} from '../core/core.module';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "../spinner/spinner.module";
import {AlertModule} from "../alert/alert.module";


@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    RouterModule,
    CoreModule,
    InfiniteScrollModule,
    SpinnerModule,
    AlertModule
  ],
  declarations: [AgendaListComponent, AgendaShowComponent]
})
export class AgendaModule {
}
