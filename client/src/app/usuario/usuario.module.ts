import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioComponent} from './usuario.component';
import {UsuarioListComponent} from "./usuario-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PerfectScrollbarModule
  ],
  exports: [
    UsuarioComponent
  ]
})
export class UsuarioModule {
}
