import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Usuario} from "./usuario";


@Injectable()
export class UsuarioService extends HeadersHelper {

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

  list(max?: any, offset?: any): Observable<any[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get(this.baseUrl + `usuario?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      if (!json.hasOwnProperty('error')) {
        subject.next(json.map((obj: any) => new Usuario(obj)));
      } else {
        subject.next(json);
      }
    });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Usuario[]>(this.baseUrl + `usuario/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Usuario>();
    this.http.get(this.baseUrl + `usuario/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Usuario(json));
      }
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get(this.baseUrl + `usuario/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Usuario(obj)))
      }
    });
    return subject.asObservable();
  }

  save(usuario: Usuario): Observable<any> {
    let subject = new Subject<Usuario>();
    if (usuario.id) {
      this.http.put<Usuario>(this.baseUrl + `usuario/` + usuario.id, usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json)
        } else {
          subject.next(json.map((obj: any) => new Usuario(obj)))
        }
      });
    } else {
      this.http.post<Usuario>(this.baseUrl + `usuario/`, usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json)
        } else {
          subject.next(json.map((obj: any) => new Usuario(obj)))
        }
      });
    }
    return subject.asObservable()
  }


  destroy(usuario: Usuario): Observable<any> {
    let subject = new Subject<Usuario>();

    this.http.delete(this.baseUrl + `usuario/` + usuario.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    }).pipe(
      catchError(error => of({error}))
    ).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Usuario(obj)))
      }
    });
    return subject.asObservable()
  }

  onOff(usuario: Usuario): any {
    return this.http.put<Usuario>(this.baseUrl + 'usuario/onOff/' + usuario.id, '', {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }

}
