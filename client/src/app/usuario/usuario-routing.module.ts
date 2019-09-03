import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsuarioListComponent} from "./usuario-list.component";
import {UsuarioEditComponent} from "./usuario-edit.component";
import {UsuarioShowComponent} from "./usuario-show.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {AgendaListComponent} from "../agenda/agenda-list.component";
import {AgendaShowComponent} from "../agenda/agenda-show/agenda-show.component";


const routes: Routes = [
  {
    path: 'usuario', canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: UsuarioListComponent, data: {permissao: 'ROLE_ADMIN'}},
      {path: 'edit/:id', component: UsuarioEditComponent, data: {permissao: 'ROLE_ADMIN'}},
      {path: 'show/:id', component: UsuarioShowComponent, data: {permissao: 'ROLE_ADMIN'}},
    ]
  },
  {
    path: 'agenda/list/:id',
    component: AgendaListComponent,
    canActivate: [AuthGuard],
    data: {permissao: 'ROLE_MEDICO'}
  },
  {
    path: 'agenda/show/:data/:id',
    component: AgendaShowComponent,
    canActivate: [AuthGuard],
    data: {permissao: 'ROLE_MEDICO'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {
}
