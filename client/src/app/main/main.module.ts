import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AlertModule} from "../alert/alert.module";
import {SpinnerModule} from "../spinner/spinner.module";
import {MenuModule} from "../menu/menu.module";
import {HeaderModule} from "../header/header.module";
import {MainRoutingModule} from "./main-routing.module";
import {AgendaRoutingModule} from "../agenda/agenda-routing.module";
import {UsuarioRoutingModule} from "../usuario/usuario-routing.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AlertModule,
    SpinnerModule,
    MenuModule,
    HeaderModule,
    MainRoutingModule,
    AgendaRoutingModule,
    UsuarioRoutingModule
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
