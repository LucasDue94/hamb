import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgendaRoutingModule} from './agenda-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {AgendaListComponent} from './agenda-list.component';


@NgModule({
  imports: [
    CommonModule,
    AgendaRoutingModule,
    FontAwesomeModule,
    PerfectScrollbarModule

  ],
  declarations: [AgendaListComponent]
})
export class AgendaModule {
}
