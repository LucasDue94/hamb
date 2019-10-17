import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.prod";
import {Forgot} from "../forgot/forgot";

@Injectable({
  providedIn: 'root'
})
export class RedefineSenhaService {

  private baseUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient) {
  }

  update(forgot: Forgot): Observable<Forgot> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    return this.httpClient.put<Forgot>(this.baseUrl + 'forgot/'+ forgot.id + '/' + forgot.token, forgot, {
      headers: httpOptions.headers,
      responseType: 'json'
    });
  }

}
