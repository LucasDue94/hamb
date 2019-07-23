import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BuscaComponent} from "../busca/busca.component";
import {UsuarioListComponent} from "../usuario/usuario-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'usuario', component: UsuarioListComponent},
  // {path: 'agenda', component: AgendaListComponent},
  {path: 'busca', component: BuscaComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:
    [RouterModule]
})

export class MenuRoutingModule {
}
