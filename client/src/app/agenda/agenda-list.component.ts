import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {Router} from "@angular/router";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agendas: Map<string, Agenda>;
  dias;
  spinner = false;

  constructor(private render: Renderer2, private agendaService: AgendaService,
              private router: Router) {
  }

  ngOnInit() {
   this.loading();
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agendas) => {
      this.agendas = Agenda.mergeAgenda(agendas);
      // this.countAtendidos();
      console.log(this.agendas);
      this.dias = Array.from(this.agendas.keys());
     this.loaded();
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

  loading = () => this.spinner = true;
  loaded = () => this.spinner = false;
}


