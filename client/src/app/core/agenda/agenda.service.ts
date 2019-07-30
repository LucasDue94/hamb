import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agenda: any[] = [
    {
      id: 1,
      prontuario: 214589,
      codpac: 2458,
      nome: "José da Silva Peixoto",
      idade: 50,
      convenio: "Particular",
      retorno: true,
      consulta: new Date(),
      periodo: 'tarde',
      atendimento: 'realizado'
    },
    {
      id: 2,
      prontuario: 214590,
      codpac: 2557,
      nome: "Maria da Graça da Silva",
      idade: 30,
      convenio: "Particular",
      retorno: false,
      periodo: 'manhã',
      atendimento: 'realizado'
    },
    {
      id: 3,
      prontuario: 214591,
      codpac: 2358,
      nome: "Manuela dos Santos da Silva",
      idade: 20,
      convenio: "Unimed",
      retorno: true,
      periodo: 'manhã',
      atendimento: 'Não Realizado'
    },
    {
      id: 4,
      prontuario: 214592,
      codpac: 2151,
      nome: "Márcio dos Santos da Silva",
      idade: 38,
      convenio: "Bradesco",
      retorno: true,
      periodo: 'tarde',
      atendimento: 'Não Realizado'
    },
    {
      id: 5,
      prontuario: 214593,
      codpac: 2052,
      nome: "Wilma Soares Melo",
      idade: 28,
      convenio: "Smile",
      retorno: false,
      periodo: 'manhã',
      atendimento: 'Não Realizado'
    }
  ];


  constructor(private httpClient: HttpClient) {
  }

  list(): any[] {
    return this.agenda;
  }
}
