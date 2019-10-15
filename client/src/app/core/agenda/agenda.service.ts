import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Agenda} from "./agenda";


@Injectable()
export class AgendaService extends HeadersHelper {

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

  list(max?: any, offset?: any, data?: any, usuarioId?: number): Observable<any[]> {
    let subject = new Subject<Agenda[]>();
    this.http.get(this.baseUrl + `agenda?offset=` + offset + '&max=' + max + '&data=' + data + '&usuarioId=' + usuarioId, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      if (!json.hasOwnProperty('error')) {
        subject.next(json.map((obj: any) => new Agenda(obj)));
      } else {
        subject.next(json);
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

  get(id: number): Observable<any> {
    let subject = new Subject<Agenda>();
    this.http.get(this.baseUrl + `agenda/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Agenda(json));
      }
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Agenda[]>();
    this.http.get(this.baseUrl + `agenda/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Agenda(obj)))
      }
    });
    return subject.asObservable();
  }

  save(agenda: Agenda): Observable<any> {
    let subject = new Subject<Agenda>();
    if (agenda.id) {
      this.http.put<Agenda>(this.baseUrl + `agenda/` + agenda.id, agenda, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json)
        } else {
          subject.next(json.map((obj: any) => new Agenda(obj)))
        }
      });
    } else {
      this.http.post<Agenda>(this.baseUrl + `agenda/`, agenda, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json)
        } else {
          subject.next(json.map((obj: any) => new Agenda(obj)))
        }
      });
    }
    return subject.asObservable()
  }


  destroy(agenda: Agenda): Observable<any> {
    let subject = new Subject<Agenda>();

    this.http.delete(this.baseUrl + `agenda/` + agenda.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    }).pipe(
      catchError(error => of({error}))
    ).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Agenda(obj)))
      }
    });
    return subject.asObservable()
  }
}
