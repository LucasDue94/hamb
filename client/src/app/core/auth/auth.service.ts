import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {HeadersHelper} from "../headersHelper";

@Injectable()
export class AuthService extends HeadersHelper {

  private baseUrl = environment.apiUrl;
  token: string;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    })
  }

  constructor(private http?: HttpClient, private router?: Router) {
    super()
  }

  authentication(user) {
    const url = this.baseUrl + 'login';

    const data = {
      "login": user.login,
      "senha": user.senha
    };

    return this.http.post(url, data, {headers: this.getDefaultHttpOptions(), responseType: 'json'});
  }


  logout(auth) {
    const url = this.baseUrl + 'logout';
    if (auth != null) this.token = auth;
    const header = {
      auth: new HttpHeaders({
        "X-Auth-Token": this.token
      })
    };

    return this.http.post(url, null, {headers: header.auth, responseType: 'json'}).subscribe(
      resp => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      err => {
        if (err.status == '404') localStorage.clear();
      }
    )
  }

  hasPermission = value => localStorage.getItem('roles').includes(value);
}
