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

  constructor(private render: Renderer2, private agendaService: AgendaService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agendas) => {
      this.agendas = Agenda.mergeAgenda(agendas);
      this.dias = Array.from(this.agendas.keys());
    });
  }

  dateToString(key) {
    let agenda = new Agenda(this.agendas.get(key));
    let dateUTC = new Date(Date.parse(agenda.dataHora));
    return Agenda.getStringDate(dateUTC);
  }

  send = (key) => this.router.navigate(['/agenda', 'show', this.dateToString(key)]);

  getToday = () => Agenda.getDay();

  getMes = () => Agenda.getMes();

  getEfetivados(dia) {
    return Agenda.getEfetivados(this.agendas.get(dia).pacientes);
  }

  getAgendados(dia) {
    return this.agendas.get(dia).pacientes.length;
  }

//TODO
  getAtendidos() {

  }
}


