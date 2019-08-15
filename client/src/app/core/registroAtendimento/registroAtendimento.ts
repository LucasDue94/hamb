import {Paciente} from '../paciente/paciente';
import {Atendimento} from '../atendimento/atendimento';
import {Convenio} from '../convenio/convenio';

export class RegistroAtendimento {
  id: number;
  paciente: Paciente;
  origem: any;
  atendimento: Atendimento;
  convenio: Convenio;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('paciente')) {
        this.paciente = new Paciente(object['paciente']);
        delete object['paciente'];
      }

      if (object.hasOwnProperty('atendimento')) {
        this.atendimento = new Atendimento(object['atendimento']);
        delete object['atendimento'];
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
    return 'integracao.RegistroAtendimento : ' + (this.id ? this.id : '(unsaved)');
  }
}
