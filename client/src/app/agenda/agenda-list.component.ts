import {AfterViewInit, Component, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  @ViewChildren('agendaColumnList') agendaDayList: QueryList<AgendaListComponent>;

  now = new Date();

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
    {id: 10, dia: '04', agendados: 52, efetivados: 40, atentidos: 40},
    {id: 11, dia: '31', agendados: 52, efetivados: 40, atentidos: 40}
  ];
  nativeElement: any;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let today = this.now.getDate();
    this.agendas.sort((a, b) => (a.dia > b.dia) ? 1 : -1);
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
    console.log(today);
  }
}
