import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {FastSearchComponent} from "./fast-search/fast-search.component";
import {BuscaComponent} from "./busca/busca.component";
import {AtendimentoComponent} from "./atendimento/atendimento.component";
import {PacienteInfoComponent} from "./paciente-info/paciente-info.component";
import {SpinnerComponent} from "./spinner/spinner.component";

const routes: Routes = [
  {path: '', component: LoginComponent, outlet: 'login'},
  {path: 'error', component: ErrorComponent},
  {path: 'fastSearch', component: FastSearchComponent},
  {path: 'busca', component: BuscaComponent},
  {path: 'atendimento/:id', component: AtendimentoComponent},
  {path: 'pacienteInfo', component: PacienteInfoComponent},
  {path: 'spinner', component: SpinnerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
