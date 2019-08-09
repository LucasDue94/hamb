import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {FastSearchComponent} from "./fast-search/fast-search.component";

const routes: Routes = [
  {path: '', component: LoginComponent, outlet: 'login'},
  {path: 'error', component: ErrorComponent, canActivate: [AuthGuard]},
  {path: 'fastSearch', component: FastSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
