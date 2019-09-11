import {Injectable} from '@angular/core';
import {RegistroAtendimento} from './registroAtendimento';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class RegistroAtendimentoService {

  private baseUrl = environment.serverUrl;
  static UNAUTHORIZED = 401;

  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  list(max?: any, offset?: any): Observable<RegistroAtendimento[]> {
    let subject = new Subject<RegistroAtendimento[]>();
    this.http.get(this.baseUrl + `registroAtendimento?offset=` + offset + '&max=' + max, {headers: this.httpOptions.headers})
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new RegistroAtendimento(propertyName)))
      }, error => {
        if (error.status == RegistroAtendimentoService.UNAUTHORIZED) {
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<RegistroAtendimento[]>(this.baseUrl + `registroAtendimento/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<RegistroAtendimento> {
    let subject = new Subject<RegistroAtendimento>();
    this.http.get(this.baseUrl + `registroAtendimento/` + id, {headers: this.httpOptions.headers})
      .subscribe((json: any) => {
        subject.next(new RegistroAtendimento(json));
      }, error => {
        if (error.status == RegistroAtendimentoService.UNAUTHORIZED) {
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<RegistroAtendimento[]>();
    this.http.get(this.baseUrl + `registroAtendimento/` + '?offset=' + offset + '&max=' + max, {
      headers: this.httpOptions.headers,
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
    }, error => {
      if (error.status == RegistroAtendimentoService.UNAUTHORIZED) {
        this.authService.logout(localStorage.getItem('token'))
      }
    });
    return subject.asObservable();
  }

  save(registroAtendimento: RegistroAtendimento): Observable<RegistroAtendimento> {
    if (registroAtendimento.id) {
      return this.http.put<RegistroAtendimento>(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, registroAtendimento, {
        headers: this.httpOptions.headers,
        responseType: 'json'
      });
    } else {
      return this.http.post<RegistroAtendimento>(this.baseUrl + `registroAtendimento/`, registroAtendimento, {
        headers: this.httpOptions.headers,
        responseType: 'json'
      });
    }
  }


  destroy(registroAtendimento: RegistroAtendimento): Observable<Object> {
    return this.http.delete(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, {
      headers: this.httpOptions.headers,
      observe: 'response'
    });
  }
}
