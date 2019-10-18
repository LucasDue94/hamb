
export class Sala {
  codigo: string;
  unidade:string;
  nome: string;

  constructor (object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }
}
