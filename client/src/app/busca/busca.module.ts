import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuscaComponent} from './busca.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";


@NgModule({
  declarations: [BuscaComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    InfiniteScrollModule
  ]
})
export class BuscaModule { }
