import {Injectable} from '@angular/core';
import {Sala} from './sala';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class SalaService {

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

    list(max?: any, offset?: any): Observable<Sala[]> {
        let subject = new Subject<Sala[]>();
        this.http.get(this.baseUrl + `sala?offset=` + offset + '&max=' + max, {headers: this.httpOptions.headers})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Sala(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Sala[]>(this.baseUrl + `sala/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Sala> {
        let subject = new Subject<Sala>();
        this.http.get(this.baseUrl + `sala/` + id, {headers: this.httpOptions.headers})
            .subscribe((json: any) => {
                subject.next(new Sala(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Sala[]>();
        this.http.get(this.baseUrl + `sala/` + '?offset=' + offset + '&max=' + max, {
            headers: this.httpOptions.headers,
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Sala(obj)))
        });
        return subject.asObservable();
    }

    save(sala: Sala): Observable<Sala> {
        if (sala.id) {
            return this.http.put<Sala>(this.baseUrl + `sala/` + sala.id, sala, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        } else {
            return this.http.post<Sala>(this.baseUrl + `sala/`, sala, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }


    destroy(sala: Sala): Observable<Object> {
        return this.http.delete(this.baseUrl + `sala/` + sala.id, {
            headers: this.httpOptions.headers,
            observe: 'response'
        });
    }
}
