import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaListComponent} from "./agenda-list.component";
import {AgendaShowComponent} from "./agenda-show/agenda-show.component";

const routes: Routes = [
  {
    path: 'agenda', children: [
      {path: '', redirectTo:'/agenda', pathMatch:'full'},
      {path: 'show', component: AgendaShowComponent},
      {path: 'list', component: AgendaListComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
