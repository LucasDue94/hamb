import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsuarioListComponent} from "./usuario-list.component";
import {UsuarioEditComponent} from "./usuario-edit.component";
import {UsuarioShowComponent} from "./usuario-show.component";


const routes: Routes = [
  {
    path: 'usuario', children: [
      {path: '', redirectTo: '/usuario', pathMatch: 'full'},
      {path: 'list', component: UsuarioListComponent, data: {permissao: 'ROLE_ADMIN'}},
      {path: 'edit/:id', component: UsuarioEditComponent, data: {permissao: 'ROLE_ADMIN'}},
      {path: 'show/:id', component: UsuarioShowComponent, data: {permissao: 'ROLE_ADMIN'}},
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
