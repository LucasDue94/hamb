import {Injectable} from '@angular/core';
import { Agenda } from './agenda';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";


@Injectable()
export class AgendaService extends  HeadersHelper{

    private baseUrl = environment.serverUrl;

    getDefaultHttpOptions() {
        return new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem('token')
        })
    }

    constructor(private http: HttpClient) {
      super()
    }

    list(max?: any, offset?: any): Observable<Agenda[]> {
        let subject = new Subject<Agenda[]>();
        this.http.get(this.baseUrl + `agenda?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Agenda(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Agenda[]>(this.baseUrl + `agenda/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Agenda> {
        let subject = new Subject<Agenda>();
        this.http.get(this.baseUrl + `agenda/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new Agenda(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Agenda[]>();
        this.http.get(this.baseUrl + `agenda/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            console.log(json);
            subject.next(json.map((obj: any) => new Agenda(obj)))
        });
        return subject.asObservable();
    }

    save(agenda: Agenda): Observable<Agenda> {
        if (agenda.id) {
            return this.http.put<Agenda>(this.baseUrl + `agenda/` + agenda.id, agenda, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<Agenda>(this.baseUrl + `agenda/`, agenda, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(agenda: Agenda): Observable<Object> {
        return this.http.delete(this.baseUrl + `agenda/` + agenda.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}
