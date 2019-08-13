import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api} from "../../../api";
import {Observable} from "rxjs";
import {Cid} from "./cid";

@Injectable({
  providedIn: 'root'
})
export class CidService {


  constructor(private httpClient: HttpClient) { }

  list(): Observable<Cid[]> {
    return this.httpClient.get<Cid[]>(`${api}/cids`);
  }
}
