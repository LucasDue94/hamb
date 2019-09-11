import {Injectable} from '@angular/core';
import {Agenda} from './agenda';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";
import {AuthService} from "../auth/auth.service";


@Injectable()
export class AgendaService extends HeadersHelper {

  private baseUrl = environment.serverUrl;
  static UNAUTHORIZED = 401;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient, private authService: AuthService) {
    super()
  }

  list(max?: any, offset?: any, data?: any, usuarioId?: number): Observable<Agenda[]> {
    let subject = new Subject<Agenda[]>();
    this.http.get(this.baseUrl + `agenda?offset=` + offset + '&max=' + max + '&data=' + data + '&usuarioId=' + usuarioId, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new Agenda(propertyName)))
      },error => {
        if(error.status == AgendaService.UNAUTHORIZED){
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Agenda[]>(this.baseUrl + `agenda/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<Agenda> {
    let subject = new Subject<Agenda>();
    this.http.get(this.baseUrl + `agenda/` + id, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any) => {
        subject.next(new Agenda(json));
      },error => {
        if(error.status == AgendaService.UNAUTHORIZED){
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Agenda[]>();
    this.http.get(this.baseUrl + `agenda/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      subject.next(json.map((obj: any) => new Agenda(obj)))
    },error => {
      if(error.status == AgendaService.UNAUTHORIZED){
        this.authService.logout(localStorage.getItem('token'))
      }
    });
    return subject.asObservable();
  }

  save(agenda: Agenda): Observable<Agenda> {
    if (agenda.id) {
      return this.http.put<Agenda>(this.baseUrl + `agenda/` + agenda.id, agenda, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    } else {
      return this.http.post<Agenda>(this.baseUrl + `agenda/`, agenda, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    }
  }


  destroy(agenda: Agenda): Observable<Object> {
    return this.http.delete(this.baseUrl + `agenda/` + agenda.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
