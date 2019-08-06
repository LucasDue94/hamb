

export class RegistroAtendimento {
    id: number;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'integracao.RegistroAtendimento : ' + (this.id ? this.id : '(unsaved)');
    }
}
