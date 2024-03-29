import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioListComponent} from "./usuario-list.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CoreModule} from '../core/core.module';
import {UsuarioEditComponent} from "./usuario-edit.component";
import {UsuarioShowComponent} from "./usuario-show.component";
import {RouterModule} from "@angular/router";
import {UsuarioRoutingModule} from "./usuario-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FastSearchModule} from "../fast-search/fast-search.module";
import {SpinnerModule} from "../spinner/spinner.module";


@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioEditComponent,
    UsuarioShowComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CoreModule,
    RouterModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FastSearchModule,
    SpinnerModule
  ],
})
export class UsuarioModule {
}
