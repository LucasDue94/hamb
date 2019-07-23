import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { AgendaListComponent } from './agenda-list.component';



@NgModule({
  declarations: [AgendaComponent, AgendaListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PerfectScrollbarModule
  ],
  exports:[AgendaComponent]
})
export class AgendaModule { }
