import {AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  @ViewChildren('agendaColumnList') agendaDayList: QueryList<AgendaListComponent>;

  dayNow = new Date();
  agendas: Agenda[];
  agenda = new Agenda();
  anoAtual = new Date();
  nativeElement: any;
  dayList = [];
  monthList = [];
  yearList = [];
  tableMonth = [
    ['Janeiro', 1],
    ['Fevereiro', 2],
    ['Março', 3],
    ['Abril', 4],
    ['Maio', 5],
    ['Junho', 6],
    ['Julho', 7],
    ['Agosto', 8],
    ['Setembro', 9],
    ['Outubro', 10],
    ['Novembro', 11],
    ['Dezembro', 12]
  ];
  year;
  day;
  month;

  constructor(private render: Renderer2, private agendaService: AgendaService) {
  }

  ngOnInit() {
    this.agendaService.list().subscribe(agendas => {

    });
  }

  ngAfterViewInit(): void {
    let today = this.dayNow.getDate();
    /*
        this.dayList.sort((a, b) => (a.dia > b.dia) ? 1 : -1);
    */
    this.agendaDayList.forEach(day => {
      this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#A9ABAE');
      if (day.nativeElement.childNodes[0].textContent > today) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#A9ABAE');
        this.render.setStyle(day.nativeElement.childNodes[1], 'color', '#A9ABAE');
      } else if (day.nativeElement.childNodes[0].textContent > today) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#5A5B5B');
      } else if (day.nativeElement.childNodes[0].textContent == today) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#2B517E');
        this.render.setStyle(day.nativeElement.childNodes[0], 'cursor', 'pointer');
      }
    });
  }
}
