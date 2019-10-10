import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Atendimento} from "../atendimento/atendimento";
import {last} from "rxjs/operators";

export class Paciente {
  id: string;
  nome: string;
  nascimento: any;
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

  getLastRegistro() {
    //TODO pegar último registro caso queira salvar o histórico pela rota da busca
  }
}
