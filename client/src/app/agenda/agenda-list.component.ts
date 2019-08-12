import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {Agenda} from "../core/agenda/agenda";
import {AgendaService} from "../core/agenda/agenda.service";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agenda: Agenda = new Agenda();
  nativeElement: any;
  agendas: Agenda[] = [];
  dias = [];
  datas: any;

  constructor(private render: Renderer2, private agendaService: AgendaService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.agendaService.list().subscribe((agenda) => {
      this.agendas = agenda;
      agenda.forEach(a => {
        let dia = new Date(a.dataHora);
        this.dias.push(dia.getDate());
      });
      this.datas = new Set(this.dias);
    });

  }
}
