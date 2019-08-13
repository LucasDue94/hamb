import {PacienteAgendado} from '../pacienteAgendado/pacienteAgendado';
import {Sala} from '../sala/sala';

export class Agenda {
  id: number;
  pacientes: PacienteAgendado[];
  crm: string;
  dataHora: any;
  sala: Sala;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('pacientes')) {
        this.pacientes = object['pacientes'].map((obj: any) => {
          return new PacienteAgendado(obj);
        });
        delete object['pacientes'];
      }

      if (object.hasOwnProperty('sala')) {
        this.sala = new Sala(object['sala']);
        delete object['sala'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  static getMes() {
    let stringMes;
    let mesAtual = new Date();
    let mes = mesAtual.getMonth() + 1;

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

  static getToday() {
    return (new Date()).getDate()
  }

  static getDay(data) {
    let dataFormat = new Date(data);
    return dataFormat.getDate();
  }

  toString(): string {
    return 'integracao.Agenda : ' + (this.id ? this.id : '(unsaved)');
  }
}
