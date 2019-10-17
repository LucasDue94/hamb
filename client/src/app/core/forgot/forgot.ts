import {Usuario} from "../usuario/usuario";

export class Forgot {
  usuario?: Usuario;
  email: string;
  token: string;
  senhaAlterada: boolean;
  validade: String;


  constructor() {
  }
}
