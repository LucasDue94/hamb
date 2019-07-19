import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioListComponent implements OnInit {

  users = [
    {login: '1156', name: 'Joaquim José da silva xavier', crm: '1156'},
    {login: '007', name: 'Bond. James bond', crm: '007'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'},
    {login: '0017', name: 'Bolsonaro presidente', crm: '0017'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
