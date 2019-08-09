import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FastSearchComponent} from "./fast-search.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [FastSearchComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[FastSearchComponent]
})
export class FastSearchModule {
}
