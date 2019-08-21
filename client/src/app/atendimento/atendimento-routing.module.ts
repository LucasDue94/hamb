import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AtendimentoComponent} from "./atendimento.component";


const routes: Routes = [
  {
    path: 'atendimento',
    children: [
      {path: '', redirectTo: 'atendimento', pathMatch: 'full'},
      {path: 'list/:codPrt', component: AtendimentoComponent, data: {permissao: 'ROLE_ADMIN'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule {
}
