import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaListComponent} from "./agenda-list.component";
import {AgendaShowComponent} from "./agenda-show/agenda-show.component";

const routes: Routes = [
  {
    path: 'agenda', children: [
      {path: '', redirectTo:'/agenda', pathMatch:'full'},
      {path: 'show', component: AgendaShowComponent, data: {permissao: 'ROLE_ADMIN'}},
      {path: 'list', component: AgendaListComponent, data: {permissao: 'ROLE_ADMIN'}}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
