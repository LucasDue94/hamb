import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioComponent} from './usuario.component';
import {UsuarioListComponent} from "./usuario-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    CoreModule
],
  exports: [
    UsuarioComponent
  ]
})
export class UsuarioModule {
}
