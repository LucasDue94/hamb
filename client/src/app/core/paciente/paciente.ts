import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';

export class Paciente {
  id: number;
  nome: string;
  dataNasc: any;
  nomeMae: string;
  contato: string;
  registros: RegistroAtendimento[];

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('registros')) {
        this.registros = object['registros'].map((obj: any) => {
          return new RegistroAtendimento(obj);
        });
        delete object['registros'];
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
