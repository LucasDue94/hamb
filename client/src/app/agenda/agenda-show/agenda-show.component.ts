import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agenda-show',
  templateUrl: './agenda-show.component.html',
  styleUrls: ['./agenda-show.component.scss']
})
export class AgendaShowComponent implements OnInit {

  pacientes = [
    {id:1, prontuario: 214589, codpac: 2458, nome: "José da Silva Peixoto", idade: 50, convenio: "Particular", retorno: true},
    {id:2, prontuario: 214590, codpac: 2557, nome: "Maria da Graça da Silva", idade: 30, convenio: "Particular", retorno: false},
    {id:3, prontuario: 214591, codpac: 2358, nome: "Manuela dos Santos da Silva", idade: 20, convenio: "Unimed", retorno: false },
    {id:4, prontuario: 214592, codpac: 2151, nome: "Márcio dos Santos da Silva", idade: 38, convenio: "Bradesco", retorno: true},
    {id:5, prontuario: 214593, codpac: 2052, nome: "Wilma Soares Melo", idade: 28, convenio: "Smile", retorno: false}
  ]

  constructor() { }

  ngOnInit() {
  }

}
