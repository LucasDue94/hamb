import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BuscaComponent} from "../busca/busca.component";
import {UsuarioListComponent} from "../usuario/usuario-list.component";
import {AgendaListComponent} from "../agenda/agenda-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'usuario', component: UsuarioListComponent, data: {permissao: 'ROLE_ADMIN'}},
  {path: 'busca', component: BuscaComponent},
  {path: 'agenda', component: AgendaListComponent, data: {permissao: 'ROLE_ADMIN'}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:
    [RouterModule]
})

export class MenuRoutingModule {
}
