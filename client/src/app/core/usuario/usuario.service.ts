import {Injectable} from '@angular/core';
import {Usuario} from './usuario';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {HeadersHelper} from "../headersHelper";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsuarioService extends HeadersHelper {

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

  list(max?: any, offset?: any): Observable<Usuario[]> {
    let subject = new Subject<Usuario[]>();

    this.http.get(this.baseUrl + `usuario?offset=${offset}&max=${max}`, {headers: this.getDefaultHttpOptions()})
      .subscribe((json: any[]) => {
        subject.next(json.map((usuario: any) => new Usuario(usuario)))
      },error => {
        if(error.status == UsuarioService.UNAUTHORIZED){
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Usuario> {
    let subject = new Subject<Usuario>();
    this.http.get(this.baseUrl + 'usuario/' + id, {headers:this.getDefaultHttpOptions()})
      .subscribe((json: any) => {
        subject.next(new Usuario(json));
      },error => {
        if(error.status == UsuarioService.UNAUTHORIZED){
          this.authService.logout(localStorage.getItem('token'))
        }
      });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    const url = this.baseUrl + 'usuario';
    let subject = new Subject<Usuario[]>();
    this.http.get(url + `?offset=${offset}&max=${max}`, {
      headers:this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).subscribe((json: any) => {
      subject.next(json.map((usuario: any) => new Usuario(usuario)))
    },error => {
      if(error.status == UsuarioService.UNAUTHORIZED){
        this.authService.logout(localStorage.getItem('token'))
      }
    });
    return subject.asObservable();
  }

  save(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      return this.http.put<Usuario>(this.baseUrl + 'usuario/' + usuario.id, usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    } else {
      return this.http.post<Usuario>(this.baseUrl + 'usuario', usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    }
  }

  onOff(usuario: Usuario): any {
    return this.http.put<Usuario>(this.baseUrl + 'usuario/onOff/' + usuario.id, '', {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }

  destroy(usuario: Usuario): Observable<Object> {
    return this.http.delete(this.baseUrl + 'usuario/' + usuario.id, {
      headers:this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
