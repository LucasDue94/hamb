import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {PacienteService} from "../core/paciente/paciente.service";
import {Paciente} from "../core/paciente/paciente";
import {debounceTime, switchMap} from "rxjs/operators";

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
  max = 15;

  constructor(private spinner: NgxSpinnerService,
              private render: Renderer2, private pacienteService: PacienteService) {
  }

  ngOnInit() {
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
    this.offset += 15;
    this.pacienteService.search(this.searchControl.value, this.offset,this.max).subscribe(pacientes => {
      pacientes.forEach(paciente => this.pacientes.push(paciente));
      this.spinner.hide();
      console.log(this.pacientes);
    });
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.offset = 0;
        if (this.pacientes != undefined) this.pacientes.length = 0;
        return this.pacienteService.search(changes, this.offset)
      })
    ).subscribe(res => {
      this.pacientes = res;
      console.log(this.pacientes)
      this.spinner.hide();
    });
  }
}
