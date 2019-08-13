import {Injectable} from '@angular/core';
import { Convenio } from './convenio';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";


@Injectable()
export class ConvenioService extends  HeadersHelper{

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

    list(max?: any, offset?: any): Observable<Convenio[]> {
        let subject = new Subject<Convenio[]>();
        this.http.get(this.baseUrl + `convenio?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Convenio(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Convenio[]>(this.baseUrl + `convenio/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Convenio> {
        let subject = new Subject<Convenio>();
        this.http.get(this.baseUrl + `convenio/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new Convenio(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Convenio[]>();
        this.http.get(this.baseUrl + `convenio/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            console.log(json);
            subject.next(json.map((obj: any) => new Convenio(obj)))
        });
        return subject.asObservable();
    }

    save(convenio: Convenio): Observable<Convenio> {
        if (convenio.id) {
            return this.http.put<Convenio>(this.baseUrl + `convenio/` + convenio.id, convenio, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<Convenio>(this.baseUrl + `convenio/`, convenio, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(convenio: Convenio): Observable<Object> {
        return this.http.delete(this.baseUrl + `convenio/` + convenio.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}