

export class Atendimento {
  id: number;

  

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'hamb.Atendimento : ' + (this.id ? this.id : '(unsaved)');
  }
}