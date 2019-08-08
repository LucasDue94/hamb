import {Injectable} from '@angular/core';
import {Paciente} from './paciente';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";

@Injectable()
export class PacienteService extends HeadersHelper {

  private baseUrl = environment.serverUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient) {
    super()
  }

  list(max?: any, offset?: any): Observable<Paciente[]> {
    let subject = new Subject<Paciente[]>();
    this.http.get(this.baseUrl + `paciente?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any[]) => {
        subject.next(json.map((paciente: any) => new Paciente(paciente)))
      });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Paciente[]>(this.baseUrl + `paciente/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<Paciente> {
    let subject = new Subject<Paciente>();
    this.http.get(this.baseUrl + `paciente/` + id, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any) => {
        subject.next(new Paciente(json));
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Paciente[]>();
    this.http.get(this.baseUrl + `paciente/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      subject.next(json.map((obj: any) => new Paciente(obj)))
    });
    return subject.asObservable();
  }

  save(paciente: Paciente): Observable<Paciente> {
    if (paciente.id) {
      return this.http.put<Paciente>(this.baseUrl + `paciente/` + paciente.id, paciente, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    } else {
      return this.http.post<Paciente>(this.baseUrl + `paciente/`, paciente, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    }
  }


  destroy(paciente: Paciente): Observable<Object> {
    return this.http.delete(this.baseUrl + `paciente/` + paciente.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
