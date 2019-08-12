export class Agenda {
  id: string;
  crm: string;
  dataHora: any;
  codigo: string;
  unidade: string;
  pacientes: [];

  constructor() {
  }


  getMes() {
    let stringMes;
    let mesAtual = new Date();
    let mes = mesAtual.getMonth()+1;

    switch (mes) {
      case 1:
        stringMes = 'Janeiro';
        break;
      case 2:
        stringMes = 'Fevereiro';
        break;
      case 3:
        stringMes = 'Março';
        break;
      case 4:
        stringMes = 'Abril';
        break;
      case 5:
        stringMes = 'Maio';
        break;
      case 6:
        stringMes = 'Junho';
        break;
      case 7:
        stringMes = 'Julho';
        break;
      case 8:
        stringMes = 'Agosto';
        break;
      case 9:
        stringMes = 'Setembro';
        break;
      case 10:
        stringMes = 'Outubro';
        break;
      case 11:
        stringMes = 'Novembro';
        break;
      case 12:
        stringMes = 'Dezembro';
        break;
    }
    return stringMes;
  }

  getToday() {
    return (new Date()).getDate();
  }

}
