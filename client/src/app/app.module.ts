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
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import {AuthGuard} from "./core/guards/auth.guard";
import {ErrorComponent} from "./error/error.component";
import {FastSearchModule} from "./fast-search/fast-search.module";
import {AtendimentoModule} from "./atendimento/atendimento.module";
import { PacienteAgendadoModule } from './pacienteAgendado/pacienteAgendado.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
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
    AtendimentoModule,
    BuscaModule,
    UsuarioModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    LoginModule,
    FastSearchModule,
    PacienteAgendadoModule
],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
