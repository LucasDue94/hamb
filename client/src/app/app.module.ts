import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HeaderModule} from "./header/header.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MenuModule} from "./menu/menu.module";
import {MainModule} from "./main/main.module";
import {RouterModule} from "@angular/router";
import {AgendaModule} from "./agenda/agenda.module";
import {BuscaModule} from "./busca/busca.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import {HistoricoModule} from "./historico/historico.module";

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
    AgendaModule,
    HistoricoModule,
    BuscaModule,
    UsuarioModule,
    ReactiveFormsModule,
    LoginModule,
    RouterModule
  ],

  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
