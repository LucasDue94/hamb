import {UsuarioCid} from '../usuarioCid/usuarioCid';

export class Cid {
  id: string;
  diagnostico: string;
  usuarios: UsuarioCid[];

  constructor(object?: any) {
    if (object) {

      if (object.hasOwnProperty('usuarios')) {
        this.usuarios = object['usuarios'].map((obj: any) => {
          return new UsuarioCid(obj);
        });
        delete object['usuarios'];
      }

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'integracao.Cid : ' + (this.id ? this.id : '(unsaved)');
  }
}
