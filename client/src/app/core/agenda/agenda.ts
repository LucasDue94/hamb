import { PacienteAgendado } from '../pacienteAgendado/pacienteAgendado';
import { Sala } from '../sala/sala';

export class Agenda {
    id: number;

    pacientes: PacienteAgendado[];
  crm: string;
  dataHora: any;
  sala: Sala;

    constructor (object?: any) {
      if (object) {
        
        if (object.hasOwnProperty('pacientes')) {
          this.pacientes = object['pacientes'].map((obj: any) => { return new PacienteAgendado(obj); });
        delete object['pacientes'];
        }
        
        if (object.hasOwnProperty('sala')) {
          this.sala = new Sala(object['sala']);
        delete object['sala'];
        }
        
        for (var prop in object) {
          this[prop] = object[prop];
        }
      }

    }

    toString(): string {
      return 'integracao.Agenda : ' + (this.id ? this.id : '(unsaved)');
    }
}
