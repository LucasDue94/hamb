import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {BuscaComponent} from "./busca/busca.component";
import {RedefineSenhaComponent} from "./redefine-senha/redefine-senha.component";

const routes: Routes = [
  {path: '', component: LoginComponent, outlet: 'login'},
  {path: 'redefinicaodesenha', component: RedefineSenhaComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'busca', component: BuscaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
