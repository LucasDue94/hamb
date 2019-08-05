import {Paciente} from "../paciente/paciente";
import {Cid} from "../cid/cid";


export class Atendimento {
  id: number;
  cid: Cid;
  paciente: Paciente;
  conteudo: string;
  dataAtendimento: string;
  

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

/*  toString(): string {
    return 'hamb.Atendimento : ' + (this.id ? this.id : '(unsaved)');
  }*/
}
