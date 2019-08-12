import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Agenda} from "./agenda";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseUrl = environment.serverUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) {
  }

  list(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.baseUrl}agenda`, {headers: this.httpOptions.headers});
  }
}
