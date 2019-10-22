import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Atendimento} from "./atendimento";


@Injectable()
export class AtendimentoService extends HeadersHelper {

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

  list(max?: any, offset?: any, codPrt?: any): Observable<any[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + `atendimento?offset=` + offset + '&max=' + max + '&codPrt=' + codPrt, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      if (!json.hasOwnProperty('error')) {
        subject.next(json.map((obj: any) => new Atendimento(obj)));
      } else {
        subject.next(json);
      }
    });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Atendimento[]>(this.baseUrl + `atendimento/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Atendimento>();
    this.http.get(this.baseUrl + `atendimento/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Atendimento(json));
      }
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + `atendimento/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Atendimento(obj)))
      }
    });
    return subject.asObservable();
  }

  save(atendimento: Atendimento): any {
    let subject = new Subject<Atendimento>();
    console.log(atendimento)
    if (atendimento.id) {
      this.http.put<Atendimento>(this.baseUrl + `atendimento/` + atendimento.id, atendimento, {
        headers: this.getDefaultHttpOptions(),
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json)
        } else {
          subject.next(json.map((obj: any) => new Atendimento(obj)))
        }
      });
    } else {
      this.http.post<Atendimento>(this.baseUrl + `atendimento/`, atendimento, {
        headers: this.getDefaultHttpOptions(),
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
          subject.next(json);
      });
    }
    return subject.asObservable()
  }


  destroy(atendimento: Atendimento): Observable<any> {
    let subject = new Subject<Atendimento>();

    this.http.delete(this.baseUrl + `atendimento/` + atendimento.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    }).pipe(
      catchError(error => of({error}))
    ).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Atendimento(obj)))
      }
    });
    return subject.asObservable()
  }
}
