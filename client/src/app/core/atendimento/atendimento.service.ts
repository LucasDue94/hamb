/*
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, RequestMethod, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Atendimento} from './atendimento';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class AtendimentoService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) {
  }

  list(): Observable<Atendimento[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get(this.baseUrl + 'atendimento')
      .map((r: Response) => r.json())
      .subscribe((json: any[]) => {
        subject.next(json.map((item: any) => new Atendimento(item)))
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Atendimento> {
    return this.http.get(this.baseUrl + 'atendimento/'+id)
      .map((r: Response) => new Atendimento(r.json()));
  }

  save(atendimento: Atendimento): Observable<Atendimento> {
    const requestOptions = new RequestOptions();
    if (atendimento.id) {
      requestOptions.method = RequestMethod.Put;
      requestOptions.url = this.baseUrl + 'atendimento/' + atendimento.id;
    } else {
      requestOptions.method = RequestMethod.Post;
      requestOptions.url = this.baseUrl + 'atendimento';
    }
    requestOptions.body = JSON.stringify(atendimento);
    requestOptions.headers = new Headers({"Content-Type": "application/json"});

    return this.http.request(new Request(requestOptions))
      .map((r: Response) => new Atendimento(r.json()));
  }

  destroy(atendimento: Atendimento): Observable<boolean> {
    return this.http.delete(this.baseUrl + 'atendimento/' + atendimento.id).map((res: Response) => res.ok).catch(() => {
      return Observable.of(false);
    });
  }
}*/
