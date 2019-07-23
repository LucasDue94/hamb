import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['agenda.component.scss']
})
export class AgendaListComponent implements OnInit {

  agendas = [
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40},
    {dia: '16', agendados: 52, efetivados: 40, atentidos: 40}

  ];

  constructor() { }

  ngOnInit() {
  }

}
