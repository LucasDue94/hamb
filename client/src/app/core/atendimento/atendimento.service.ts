import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Atendimento} from "./atendimento";
import {api} from "../../../api";

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Atendimento[]>{
    return this.httpClient.get<Atendimento[]>(`${api}/atendimentos`);
  }
}
