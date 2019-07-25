import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioComponent} from './usuario.component';
import {UsuarioListComponent} from "./usuario-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { CoreModule } from '../core/core.module';
import {RouterModule} from "@angular/router";
import {AgendaModule} from "../agenda/agenda.module";


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    CoreModule,
    AgendaModule,
    RouterModule
  ],
  exports: [
    UsuarioComponent
  ]
})
export class UsuarioModule {
}
