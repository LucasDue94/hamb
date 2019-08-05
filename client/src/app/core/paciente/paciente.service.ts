import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paciente} from "./paciente";
import {api} from "../../../api";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(`${api}/pacientes`);
  }
}
