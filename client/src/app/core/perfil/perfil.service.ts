/*
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Perfil} from './perfil';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class PerfilService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Perfil[]> {
    let subject = new Subject<Perfil[]>();
    this.http.get(this.baseUrl + 'perfil')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Perfil(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Perfil> {
    return this.http.get(this.baseUrl + 'perfil/'+id)
      .map((r: Response) => new Perfil(r.json()));
  }

  save(perfil: Perfil): Observable<Perfil> {
    const requestOptions = new RequestOptions();
    if (perfil.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'perfil/' + perfil.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'perfil';
    }
    requestOptions.body = JSON.stringify(perfil);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Perfil(r.json()));
  }

  destroy(perfil: Perfil): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'perfil/' + perfil.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}*/
