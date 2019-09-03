import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgendaListComponent} from "./agenda-list.component";
import {AgendaShowComponent} from "./agenda-show/agenda-show.component";
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'agenda',
    canActivate: [AuthGuard],
    data: {permissao: 'ROLE_MEDICO'},
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'show/:data/:id',
        component: AgendaShowComponent,
        canActivate: [AuthGuard],
        data: {permissao: 'ROLE_MEDICO', agenda: ''}
      },
      {
        path: 'list',
        component: AgendaListComponent,
        canActivate: [AuthGuard],
        data: {permissao: 'ROLE_MEDICO'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AgendaRoutingModule {
}
