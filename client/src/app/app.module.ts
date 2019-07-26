import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HeaderModule} from "./header/header.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {MenuModule} from "./menu/menu.module";
import {MainModule} from "./main/main.module";
import {RouterModule} from "@angular/router";
import {AgendaModule} from "./agenda/agenda.module";
import {BuscaModule} from "./busca/busca.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    HeaderModule,
    MenuModule,
    MainModule,
    RouterModule,
    AgendaModule,
    BuscaModule,
    UsuarioModule,
    PerfectScrollbarModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
