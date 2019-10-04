import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  searchForm: FormGroup;
  searchControl: FormControl;
  offset = 0;
  max = 15;
  showCard = false;
  currentPaciente;
  spinner = false;
  loading = () => this.spinner = true;
  loaded = () => this.spinner = false;
  constructor(private render: Renderer2, private pacienteService: PacienteService) {}

  ngOnInit() {
    this.loading();
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.loaded();
  }


  scrollDown() {
    this.loading();
    this.offset += 15;
    this.pacienteService.search(this.searchControl.value, this.offset, this.max).subscribe(pacientes => {
      pacientes.forEach(paciente => this.pacientes.push(paciente));
      this.loaded();
    });
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.loading();
        this.offset = 0;
        if (this.pacientes != undefined) this.pacientes.length = 0;
        return this.pacienteService.search(changes, this.offset, this.max)
      })
    ).subscribe(res => {
      this.pacientes = res;
      console.log(res)
      this.loaded();
    });
  }

  toogle(paciente) {
    this.currentPaciente = paciente;
    this.showCard = !this.showCard;
  }

  goAtendimento(atendimentos){
    console.log(atendimentos);
  }

}
