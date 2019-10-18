import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {AgendaListComponent} from "../agenda/agenda-list.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {AgendaShowComponent} from "../agenda/agenda-show/agenda-show.component";
import {AtendimentoComponent} from "../atendimento/atendimento.component";
import {BuscaComponent} from "../busca/busca.component";
import {UsuarioListComponent} from "../usuario/usuario-list.component";
import {UsuarioEditComponent} from "../usuario/usuario-edit.component";
import {UsuarioShowComponent} from "../usuario/usuario-show.component";
import {ErrorComponent} from "../error/error.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {path: 'busca', component: BuscaComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      {path: 'error/:cod/:id', component: ErrorComponent},
      {
        path: 'agenda',
        canActivate: [AuthGuard],
        data: {permissao: 'ROLE_MEDICO'},
        children: [
          {
            path: '',
            redirectTo: 'list/:id',
            pathMatch: 'full'
          },
          {
            path: 'show/:data/:id',
            component: AgendaShowComponent,
            canActivate: [AuthGuard],
            data: {permissao: 'ROLE_MEDICO', agenda: ''}
          },
          {
            path: 'list/:id',
            component: AgendaListComponent,
            canActivate: [AuthGuard],
            data: {permissao: 'ROLE_MEDICO'}
          },
        ]
      },
      {
        path: 'atendimento',
        children: [
          {path: ':id', component: AtendimentoComponent, data: {permissao: 'ROLE_MEDICO'}}
        ]
      },
      {
        path: 'usuario', canActivate: [AuthGuard], children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: UsuarioListComponent, data: {permissao: 'ROLE_ADMIN'}},
          {path: 'edit/:id', component: UsuarioEditComponent, data: {permissao: 'ROLE_ADMIN'}},
          {path: 'show/:id', component: UsuarioShowComponent, data: {permissao: 'ROLE_ADMIN'}},
        ]
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
