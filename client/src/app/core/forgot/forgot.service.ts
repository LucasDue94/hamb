import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Forgot} from "./forgot";


@Injectable()
export class ForgotService extends HeadersHelper {

  private baseUrl = environment.serverUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    })
  }

  constructor(private http: HttpClient) {
    super()
  }

  list(max?: any, offset?: any): Observable<any[]> {
    let subject = new Subject<Forgot[]>();
    this.http.get(this.baseUrl + `forgot?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      if (!json.hasOwnProperty('error')) {
        subject.next(json.map((obj: any) => new Forgot(obj)));
      } else {
        subject.next(json);
      }
    });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Forgot[]>(this.baseUrl + `forgot/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Forgot>();
    this.http.get(this.baseUrl + `forgot/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Forgot(json));
      }
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Forgot[]>();
    this.http.get(this.baseUrl + `forgot/` + '?offset=' + offset + '&max=' + max, {
      headers: this.getDefaultHttpOptions(),
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Forgot(obj)))
      }
    });
    return subject.asObservable();
  }

  save(forgot: Forgot): any {
    let subject = new Subject<Forgot>();
    if (forgot.id) {
      this.http.put<Forgot>(this.baseUrl + `forgot/` + forgot.id, forgot, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
          subject.next(json)
      });
    } else {
      this.http.post<Forgot>(this.baseUrl + `forgot/`, forgot, {
        headers: this.getDefaultHttpOptions(),
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable();
  }

  destroy(forgot: Forgot): Observable<any> {
    let subject = new Subject<Forgot>();

    this.http.delete(this.baseUrl + `forgot/` + forgot.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    }).pipe(
      catchError(error => of({error}))
    ).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json)
      } else {
        subject.next(json.map((obj: any) => new Forgot(obj)))
      }
    });
    return subject.asObservable()
  }
}
