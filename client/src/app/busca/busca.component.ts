import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  DoCheck, EventEmitter, Input,
  InputDecorator,
  OnChanges,
  OnInit, Output,
  Renderer2,
  SimpleChange,
  SimpleChanges, ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {PacienteService} from "../core/paciente/paciente.service";
import {Paciente} from "../core/paciente/paciente";
import {debounceTime, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  pacientes: Paciente[];
  paciente: Paciente;
  searchForm: FormGroup;
  searchControl: FormControl;
  offset = 0;
  scroll = false;
  controller;

  constructor(private spinner: NgxSpinnerService,
              private render: Renderer2, private pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.pacientes = new Array<Paciente>();
    this.spinner.show();
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.spinner.hide();
  }


  scrollDown() {
    this.spinner.show();
    this.offset += 10;
    this.pacienteService.search(this.searchControl.value, this.offset).subscribe(pacientes => {
      pacientes.forEach(paciente => this.pacientes.push(paciente));
      this.spinner.hide();
    });
  }

  search() {
    this.controller = this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.offset = 0;
        this.pacientes.length = 0;
        return this.pacienteService.search(changes, this.offset)
      })
    ).subscribe(res => {
      this.pacientes = res;
      console.log(this.pacientes.length)
      this.spinner.hide();
    });
  }
}
