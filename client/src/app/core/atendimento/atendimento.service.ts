import {Injectable} from '@angular/core';
import {Atendimento} from './atendimento';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AtendimentoService extends HeadersHelper {

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
    super();
  }


  list(max?: any, offset?: any, codPrt?: any): Observable<Atendimento[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + `atendimento?offset=` + offset + '&max=' + max + '&codPrt=' + codPrt, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new Atendimento(propertyName)))
      }, error => {
        if (error.status == AtendimentoService.UNAUTHORIZED) {
          this.authService.logout(localStorage.getItem('token'))
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

  get(id: number): Observable<Atendimento> {
    let subject = new Subject<Atendimento>();
    this.http.get(this.baseUrl + `atendimento/` + id, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any) => {
        subject.next(new Atendimento(json));
      }, error => {
        if (error.status == AtendimentoService.UNAUTHORIZED) {
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  findAtendimento(registroId: string): Observable<Atendimento[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + `atendimento/findAtendimento/` + registroId, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new Atendimento(propertyName)))
      }, error => {
        if (error.status == AtendimentoService.UNAUTHORIZED) {
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + `atendimento/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      subject.next(json.map((obj: any) => new Atendimento(obj)))
    }, error => {
      if (error.status == AtendimentoService.UNAUTHORIZED) {
        this.authService.logout(localStorage.getItem('token'))
      }
    });
    return subject.asObservable();
  }

  save(atendimento: Atendimento): any {
    if (atendimento.id) {
      return this.http.put<Atendimento>(this.baseUrl + `atendimento/` + atendimento.id, atendimento, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    } else {
      return this.http.post<Atendimento>(this.baseUrl + `atendimento/`, atendimento, {
        headers: this.getDefaultHttpOptions(),
        observe: 'response'
      });
    }
  }

  destroy(atendimento: Atendimento): Observable<Object> {
    return this.http.delete(this.baseUrl + `atendimento/` + atendimento.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
