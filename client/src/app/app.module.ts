import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
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
import {PacienteInfoModule} from "./paciente-info/paciente-info.module";
import {SpinnerDirective} from './spinner/spinner.directive';
import {ForgotModule} from "./forgot/forgot.module";
import {RedefineSenhaModule} from "./redefine-senha/redefine-senha.module";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    SpinnerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ForgotModule,
    HeaderModule,
    MenuModule,
    MainModule,
    RouterModule,
    AgendaModule,
    AtendimentoModule,
    BuscaModule,
    RedefineSenhaModule,
    UsuarioModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    LoginModule,
    FastSearchModule,
    PacienteInfoModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
