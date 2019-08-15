import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Convenio} from '../convenio/convenio';
import {Agenda} from "../agenda/agenda";

export class PacienteAgendado {
  id: number;
  agenda: Agenda;
  hora: any;
  nome: string;
  registro: RegistroAtendimento;
  convenio: Convenio;
  nascimento: any;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('agenda')) {
        this.agenda = new Agenda(object['agenda']);
        delete object['agenda'];
      }

      if (object.hasOwnProperty('registro')) {
        this.registro = new RegistroAtendimento(object['registro']);
        delete object['registro'];
      }

      if (object.hasOwnProperty('convenio')) {
        this.convenio = new Convenio(object['convenio']);
        delete object['convenio'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'integracao.PacienteAgendado : ' + (this.id ? this.id : '(unsaved)');
  }
}
