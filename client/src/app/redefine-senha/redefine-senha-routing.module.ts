import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../core/guards/auth.guard";
import {RedefineSenhaComponent} from "./redefine-senha.component";


const redefinePassRoutes: Routes = [
  { path: 'redefinicaodesenha/:id', canActivate: [AuthGuard], component: RedefineSenhaComponent, data: {pemissao: 'sempermissao'} }
];

@NgModule({
  imports: [RouterModule.forChild(redefinePassRoutes)],
  exports: [RouterModule]
})
export class RedefineSenhaRoutingModule { }
