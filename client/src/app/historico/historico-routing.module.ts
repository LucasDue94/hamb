import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoricoComponent} from "./historico.component";


const routes: Routes = [
  {
    path: 'historico',
    children: [
      {path:'', redirectTo: 'historico', pathMatch: 'full'},
      {path:'list', component: HistoricoComponent, data: {permissao: 'ROLE_ADMIN'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule {
}
