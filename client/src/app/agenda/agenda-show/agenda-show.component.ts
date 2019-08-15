import {Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../../core/agenda/agenda.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Agenda} from "../../core/agenda/agenda";
import {NgxSpinnerService} from "ngx-spinner";
import {PacienteAgendado} from "../../core/pacienteAgendado/pacienteAgendado";

@Component({
  selector: 'agenda-show',
  templateUrl: './agenda-show.component.html',
  styleUrls: ['./agenda-show.component.scss']
})
export class AgendaShowComponent implements OnInit {

  agendas: Map<string, Agenda>;
  dataAgenda;
  pacientes: PacienteAgendado[];
  horario = '';

  constructor(private agendaService: AgendaService, private render: Renderer2,
              private router: Router, private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((res) => {
      this.dataAgenda = res.data;
      this.agendaService.list('', '', this.dataAgenda).subscribe(agendas => {
        this.agendas = Agenda.mergeAgenda(agendas);
        console.log(this.agendas);
        this.getPacientes();
        this.spinner.hide()
      })
    });
  }

  getMes = () => Agenda.getMes();

  getDay = (data) => Agenda.getDay(data);

  getPacientes() {
    let keys = this.agendas.keys();
    this.pacientes = this.agendas.get(keys.next().value).pacientes;
    console.log(this.pacientes);
  }

  getHour = (stringData) => Agenda.getHour(stringData);

  filterHour(item) {

  }

  setHorario(horario) {
    this.horario = horario;
    if (this.horario == 'manhã') {

    } else {

    }
  }
}
