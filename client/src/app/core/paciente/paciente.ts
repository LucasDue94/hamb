import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Atendimento} from "../atendimento/atendimento";

export class Paciente {
  id: string;
  nome: string;
  nascimento: any;
  nomeMae: string;
  contato: string;
  registros: RegistroAtendimento[];
  atendimentos: Atendimento[];
  atendimento: Atendimento;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registros')) {
        this.registros = object['registros'].map((obj: any) => {
          return new RegistroAtendimento(obj);
        });
        delete object['registros'];
      }

      if (object.hasOwnProperty('atendimento')) {
        this.atendimento = new Atendimento(object['atendimento']);
        delete object['atendimento'];
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
    return 'integracao.Paciente : ' + (this.id ? this.id : '(unsaved)');
  }

}
