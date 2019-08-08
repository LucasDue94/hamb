

export class Sala {
    id: number;

    

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'integracao.Sala : ' + (this.id ? this.id : '(unsaved)');
    }
}
