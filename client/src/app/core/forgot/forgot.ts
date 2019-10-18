import { Usuario } from '../usuario/usuario';

export class Forgot {
    id: number;

    token: string;
  senhaAlterada: boolean;
  validade: any;
  usuario: Usuario;

    constructor (object?: any) {
      if (object) {
        
        if (object.hasOwnProperty('usuario')) {
          this.usuario = new Usuario(object['usuario']);
        delete object['usuario'];
        }
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'hamb.Forgot : ' + (this.id ? this.id : '(unsaved)');
    }
}
