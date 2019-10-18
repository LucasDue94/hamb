import {Component, Input, OnInit} from '@angular/core';
import {Paciente} from "../core/paciente/paciente";
import {Agenda} from "../core/agenda/agenda";
import {PacienteAgendado} from "../core/pacienteAgendado/pacienteAgendado";

@Component({
  selector: 'paciente-info',
  templateUrl: './paciente-info.component.html',
  styleUrls: ['./paciente-info.component.scss']
})
export class PacienteInfoComponent implements OnInit {

  @Input() paciente: Paciente;

  constructor() {}

  ngOnInit() {}

  getDate() {
    if (this.paciente != undefined && this.paciente.nascimento != undefined) {
      let date = new Date(this.paciente.nascimento);
      let stringData = date.toLocaleString().substring(0, 10);
      return stringData.replace(/-/g, "/");
    }
  }

  getIdade() {
    if (this.paciente != undefined && this.paciente.nascimento != undefined)
      return Agenda.getIdade(this.paciente.nascimento) + ' anos';
  }

}
