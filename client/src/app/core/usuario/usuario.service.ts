import {Injectable} from '@angular/core';
import {Usuario} from './usuario';

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";

@Injectable()
export class UsuarioService {

  private baseUrl = environment.serverUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    })
  };

  constructor(private http: HttpClient) {
  }

  list(max?: any, offset?: any): Observable<Usuario[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get(this.baseUrl + `usuario?offset=${offset}&max=${max}`, {headers: this.httpOptions.headers})
      .subscribe((json: any[]) => {
        subject.next(json.map((usuario: any) => new Usuario(usuario)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Usuario> {
    let subject = new Subject<Usuario>();
    this.http.get(this.baseUrl + 'usuario/' + id, {headers: this.httpOptions.headers})
      .subscribe((json: any) => {
        subject.next(new Usuario(json));
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    const url = this.baseUrl + 'usuario';
    let subject = new Subject<Usuario[]>();
    this.http.get(url + `?offset=${offset}&max=${max}`, {
      headers: this.httpOptions.headers,
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      console.log(json);
      subject.next(json.map((usuario: any) => new Usuario(usuario)))
    });
    return subject.asObservable();
  }

  save(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      return this.http.put<Usuario>(this.baseUrl + 'usuario/' + usuario.id, usuario, {
        headers: this.httpOptions.headers,
        responseType: 'json'
      });
    } else {
      return this.http.post<Usuario>(this.baseUrl + 'usuario', usuario, {
        headers: this.httpOptions.headers,
        responseType: 'json'
      });
    }
  }

  onOff(usuario: Usuario): any {
    return this.http.put<Usuario>(this.baseUrl + 'usuario/onOff/' + usuario.id, {
      headers: this.httpOptions.headers,
      observe: 'response'
    });
  }

  destroy(usuario: Usuario): Observable<Object> {
    return this.http.delete(this.baseUrl + 'usuario/' + usuario.id, {
      headers: this.httpOptions.headers,
      observe: 'response'
    });
  }
}
