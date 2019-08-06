export class Agenda {
  id: number;
  crm: string;
  dataHora: string;
  salaCodigo: string;
  salaUnidade: string;
  dia: Date;
  mes: Date;
  ano: Date;

  constructor(){
    this.dia = new Date();
    this.mes = new Date();
    this.ano = new Date();
  }
}
