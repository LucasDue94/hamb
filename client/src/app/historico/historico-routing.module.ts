import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoricoComponent} from "./historico.component";


const routes: Routes = [
  {
    path: 'historico',
    children: [
      {path:'', redirectTo: 'historico', pathMatch: 'full'},
      {path:'list/:id', component: HistoricoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoricoRoutingModule {
}
