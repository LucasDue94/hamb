import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {PacienteService} from "../core/paciente/paciente.service";
import {PacienteAgendadoService} from "../core/pacienteAgendado/pacienteAgendado.service";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agendas: Map<string, Agenda>;
  dias;

  constructor(private render: Renderer2, private agendaService: AgendaService,
              private router: Router, private spinner: NgxSpinnerService,
              private atendimentoService: AtendimentoService,
              private pacienteService: PacienteService,
              private pacienteAgendadoService: PacienteAgendadoService) {
  }

  ngOnInit() {
    this.spinner.show();
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agendas) => {
      this.agendas = Agenda.mergeAgenda(agendas);
      // this.countAtendidos();
      console.log(this.agendas);
      this.dias = Array.from(this.agendas.keys());
      this.spinner.hide();
    });
  }

  dateToString(key) {
    let agenda = new Agenda(this.agendas.get(key));
    let dateUTC = new Date(Date.parse(agenda.dataHora));
    return Agenda.getStringDate(dateUTC);
  }

  send(key) {
    this.router.navigate(['/agenda', 'show', this.dateToString(key)]);
  }

  getToday = () => Agenda.getDay();

  getMes = () => Agenda.getMes();

  countEfetivados(dia) {
    return Agenda.countEfetivados(this.agendas.get(dia).pacientes);
  }

  countAgendados(dia) {
    return this.agendas.get(dia).pacientes.length;
  }

  countAtendidos(dia) {
    let total = 0;
    let pacientesAgendados = this.agendas.get(dia).pacientes;
    pacientesAgendados.forEach(paciente => {
      if (paciente.registro != undefined && paciente.registro.atendimentos != undefined) {
        if (paciente.registro.atendimentos.length > 0) {
          total++;
        }
      }
    });
    return total;
  }
}


