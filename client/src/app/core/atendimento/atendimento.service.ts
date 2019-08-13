import {Injectable} from '@angular/core';
import {Atendimento} from './atendimento';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class AtendimentoService {

    private baseUrl = environment.serverUrl;
    httpOptions = {
        headers: new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem('token')
        })
    };

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Atendimento[]> {
        let subject = new Subject<Atendimento[]>();
        this.http.get(this.baseUrl + `atendimento?offset=` + offset + '&max=' + max, {headers: this.httpOptions.headers})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Atendimento(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Atendimento[]>(this.baseUrl + `atendimento/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Atendimento> {
        let subject = new Subject<Atendimento>();
        this.http.get(this.baseUrl + `atendimento/` + id, {headers: this.httpOptions.headers})
            .subscribe((json: any) => {
                subject.next(new Atendimento(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Atendimento[]>();
        this.http.get(this.baseUrl + `atendimento/` + '?offset=' + offset + '&max=' + max, {
            headers: this.httpOptions.headers,
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            console.log(json);
            subject.next(json.map((obj: any) => new Atendimento(obj)))
        });
        return subject.asObservable();
    }

    save(atendimento: Atendimento): Observable<Atendimento> {
        if (atendimento.id) {
            return this.http.put<Atendimento>(this.baseUrl + `atendimento/` + atendimento.id, atendimento, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        } else {
            return this.http.post<Atendimento>(this.baseUrl + `atendimento/`, atendimento, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }


    destroy(atendimento: Atendimento): Observable<Object> {
        return this.http.delete(this.baseUrl + `atendimento/` + atendimento.id, {
            headers: this.httpOptions.headers,
            observe: 'response'
        });
    }
}
