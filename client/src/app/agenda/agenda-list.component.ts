import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AtendimentoService} from "../core/atendimento/atendimento.service";

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
              private atendimentoService: AtendimentoService) {
  }

  ngOnInit() {
    this.spinner.show();
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agendas) => {
      this.agendas = Agenda.mergeAgenda(agendas);
      // this.getAtendidos();
      this.dias = Array.from(this.agendas.keys());
      this.spinner.hide();
    });
  }

  dateToString(key) {
    let agenda = new Agenda(this.agendas.get(key));
    let dateUTC = new Date(Date.parse(agenda.dataHora));
    return Agenda.getStringDate(dateUTC);
  }

  send (key){
    this.router.navigate(['/agenda', 'show', this.dateToString(key)]);
  }

  getToday = () => Agenda.getDay();

  getMes = () => Agenda.getMes();

  getEfetivados(dia) {
    return Agenda.getEfetivados(this.agendas.get(dia).pacientes);
  }

  getAgendados(dia) {
    return this.agendas.get(dia).pacientes.length;
  }

//TODO
  getAtendidos(dia) {
    let pacientes = this.agendas.get(dia).pacientes;
  }
}


