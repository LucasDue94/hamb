import {Usuario} from '../usuario/usuario';
import {RegistroAtendimento} from '../registroAtendimento/registroAtendimento';
import {Cid} from '../cid/cid';
import {Paciente} from "../paciente/paciente";

export class Atendimento {
  id: number;
  usuario: Usuario;
  registroAtendimento: RegistroAtendimento;
  dataAtendimento: any;
  cid: Cid;
  conteudo: string;
  // paciente: Paciente;

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('usuario')) {
        this.usuario = new Usuario(object['usuario']);
        delete object['usuario'];
      }
    /*  if (object.hasOwnProperty('paciente')) {
        this.paciente = new Paciente(object['paciente']);
        delete object['paciente'];
      }*/

      if (object.hasOwnProperty('registroAtendimento')) {
        this.registroAtendimento = new RegistroAtendimento(object['registroAtendimento']);
        delete object['registroAtendimento'];
      }

      if (object.hasOwnProperty('cid')) {
        this.cid = new Cid(object['cid']);
        delete object['cid'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'hamb.Atendimento : ' + (this.id ? this.id : '(unsaved)');
  }

}
