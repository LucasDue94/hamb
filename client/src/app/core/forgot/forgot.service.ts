import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Forgot} from "./forgot";

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private httpClient: HttpClient) {
  }

  private baseUrl = environment.serverUrl;


  save(forgot: Forgot): Observable<Forgot> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<Forgot>(this.baseUrl + 'forgot', forgot, {
      headers: httpOptions.headers,
      responseType: 'json'
    });
  }

}
