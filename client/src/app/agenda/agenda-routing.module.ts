import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgendaListComponent} from "./agenda-list.component";

const routes: Routes = [
  {
    path: 'agenda',
    component: AgendaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
