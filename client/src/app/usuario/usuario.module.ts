import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioComponent} from './usuario.component';
import {UsuarioListComponent} from "./usuario-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { CoreModule } from '../core/core.module';
import {RouterModule} from "@angular/router";
import {AgendaModule} from "../agenda/agenda.module";
import {UsuarioEditComponent} from "./usuario-edit.component";
import {UsuarioShowComponent} from "./usuario-show.component";
import {UsuarioRoutingModule} from "./usuario-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioEditComponent,
    UsuarioShowComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    CoreModule,
    RouterModule,
    AgendaModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    UsuarioComponent
  ]
})
export class UsuarioModule {
}
