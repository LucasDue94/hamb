import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsuarioListComponent} from "./usuario-list.component";


const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'list', component: UsuarioListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
