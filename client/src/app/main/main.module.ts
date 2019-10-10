import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AlertModule} from "../alert/alert.module";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AlertModule,
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
}
