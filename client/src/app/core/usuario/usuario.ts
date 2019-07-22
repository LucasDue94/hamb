import { Perfil } from '../perfil/perfil';
import { Atendimento } from '../atendimento/atendimento';

export class Usuario {
  id: number;

  nome: string;
  login: string;
  senha: string;
  crm: string;
  ultimoAcesso: any;
  perfil: Perfil;
  atendimentos: Atendimento[];

  constructor (object?: any) {
    if (object) {
      
      if (object.hasOwnProperty('perfil')) {
        this.perfil = new Perfil(object['perfil']);
        delete object['perfil'];
      }
      
      if (object.hasOwnProperty('atendimentos')) {
        this.atendimentos = object['atendimentos'].map((obj: any) => { return new Atendimento(obj); });
        delete object['atendimentos'];
      }
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'hamb.Usuario : ' + (this.id ? this.id : '(unsaved)');
  }
}