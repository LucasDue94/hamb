import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacienteInfoComponent} from "./paciente-info.component";


@NgModule({
  declarations: [
    PacienteInfoComponent
  ],
  exports: [
    PacienteInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PacienteInfoModule {
}
