import {Usuario} from "../usuario/usuario";

export class Forgot {
  id: number;
  usuario?: Usuario;
  email: string;
  token: string;
  senhaAlterada: boolean;
  validade: String;


  constructor() {
    this.usuario = new Usuario();
  }
}
