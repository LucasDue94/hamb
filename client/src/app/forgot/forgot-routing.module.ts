import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../core/guards/auth.guard";
import {ForgotComponent} from "./forgot.component";


const forgotRoute: Routes = [
  { path: 'forgot', canActivate: [AuthGuard], component: ForgotComponent, data: {pemissao: 'sempermissao'} },

];

@NgModule({
  imports: [RouterModule.forChild(forgotRoute)],
  exports: [RouterModule]
})
export class ForgotRoutingModule { }
