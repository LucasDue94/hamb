import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {PacienteService} from "../core/paciente/paciente.service";

@Component({
  selector: 'busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  paciente;
  pacientes;
  searchForm: FormGroup;
  searchControl: FormControl;
  max = 1000;
  offset = 0;

  constructor(private spinner: NgxSpinnerService,
              private render: Renderer2, private pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.pacienteService.list(this.max, this.offset).subscribe(
      pacientes => {
        this.pacientes = pacientes;
        console.log(pacientes)
        this.spinner.hide();
      });
  }

  /*  search() {
      this.spinner.show();
      this.searchControl.valueChanges.pipe(
        debounceTime(1000),
        switchMap(search => {
          this.spinner.hide();
          return this.pacienteService.search(search, this.offset, this.max);
        }),
      ).subscribe(pacientes => this.pacientes = pacientes);
    }*/

}
