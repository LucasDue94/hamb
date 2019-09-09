import {Paciente} from '../paciente/paciente';
import {Convenio} from '../convenio/convenio';
import {Atendimento} from "../atendimento/atendimento";

export class RegistroAtendimento {
  id: number;
  paciente: Paciente;
  origem: any;
  convenio: Convenio;
  atendimentos: Atendimento[] = new Array<Atendimento>();

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('paciente')) {
        this.paciente = new Paciente(object['paciente']);
        delete object['paciente'];
      }

      if (object.hasOwnProperty('convenio')) {
        this.convenio = new Convenio(object['convenio']);
        delete object['convenio'];
      }

      if (object.hasOwnProperty('atendimentos')) {
        this.atendimentos = object['atendimentos'].map((obj: any) => {
          return new Atendimento(obj);
        });
        delete object['atendimentos'];
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
