import {AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  @ViewChildren('agendaColumnList') agendaDayList: QueryList<AgendaListComponent>;

  agendas = [
    {id: 1, dia: '24', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 2, dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 3, dia: '12', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 4, dia: '10', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 5, dia: '09', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 6, dia: '08', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 7, dia: '26', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 8, dia: '25', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 9, dia: '30', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 10, dia: '04', agendados: 52, efetivados: 40, atentidos: 40}
  ];
  nativeElement: any;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.agendas.sort((a, b) => (a.dia > b.dia) ? 1 : -1);
    this.agendaDayList.forEach(day => {
      if (day.nativeElement.childNodes[0].textContent < 25) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#A9ABAE');
        this.render.setStyle(day.nativeElement.childNodes[0], 'cursor', 'not-allowed');
      } else if (day.nativeElement.childNodes[0].textContent > 25) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#5A5B5B');
        this.render.setStyle(day.nativeElement.childNodes[0], 'cursor', 'not-allowed');
      } else if (day.nativeElement.childNodes[0].textContent == 25) {
        this.render.setStyle(day.nativeElement.childNodes[0], 'color', '#2B517E');
      }
    });
  }
}
