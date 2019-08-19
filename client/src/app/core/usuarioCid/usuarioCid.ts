

export class UsuarioCid {
    id: number;

    

    constructor (object?: any) {
      if (object) {
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'hamb.UsuarioCid : ' + (this.id ? this.id : '(unsaved)');
    }
}
