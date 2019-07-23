import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AgendaListComponent} from "./agenda-list.component";

const routes: Routes = [
  {path: 'agenda-list', component: AgendaListComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngendaRoutingModule { }
