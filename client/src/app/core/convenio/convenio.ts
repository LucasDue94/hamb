

export class Convenio {
    id: number;

    fantasia: string;

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'integracao.Convenio : ' + (this.id ? this.id : '(unsaved)');
    }
}
