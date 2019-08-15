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

  static mergeAgenda(agendas) {
    let agendasMap = new Map();
    agendas.forEach(agenda => {
      let key = (Agenda.getDay(agenda.dataHora));
      if (agendasMap.get(key)) {
        agendasMap.get(key).pacientes = agendasMap.get(key).pacientes.concat(agenda.pacientes);
      } else {
        agendasMap.set(key, agenda);
      }
    });
    return agendasMap;
  }

  static getMes() {
    let stringMes;
    let mesAtual = new Date().getMonth() + 1;

    switch (mesAtual) {
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

  static getToday = () => (new Date()).getDate();


  static getDay(stringData) {
    let dataFormat = new Date(stringData);
    return dataFormat.getDate();
  }

  static getHour(stringData) {
    let dataFormat = new Date(stringData);
    return dataFormat.getHours();
  }

  static getIdade(nasc) {
    let nascimento = new Date(nasc);
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) / 365.25);
  }

  toString() {
    return 'integracao.Agenda : ' + (this.id ? this.id : '(unsaved)');
  }
}
