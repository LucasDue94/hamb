import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agendas: Agenda[];
  agendasMapped = new Map();
  dias;


  constructor(private render: Renderer2, private agendaService: AgendaService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agendas) => {
      this.agendas = agendas;
      this.mergeAgenda();
    });
  }


  mergeAgenda() {
    this.agendas.forEach(agenda => {
      let key = (Agenda.getDay(agenda.dataHora));
      if (this.agendasMapped.get(key)) {
        this.agendasMapped.get(key).pacientes = this.agendasMapped.get(key).pacientes.concat(agenda.pacientes);
      } else {
        this.agendasMapped.set(key, agenda);
      }
    });
    this.dias = Array.from(this.agendasMapped.keys());
  }


  send(key) {
    let agenda = new Agenda(this.agendasMapped.get(key));
    this.getRoute(agenda);

    this.router.navigate(['/agenda', 'show']);
  }

  getRoute(agenda): any {
    console.log(this.router.config);
    this.router.config.forEach(r => {
      if (r.path == 'agenda') {
        r.children.forEach(child => {
          if (child.path == 'show') {
            child.data = {
              data: {
                agenda: agenda
              }
            };
          }
        })
      }
    });
  }

  getToday() {
    return Agenda.getToday();
  }

  getMes() {
    return Agenda.getMes();
  }
}


