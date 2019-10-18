import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Convenio} from "./convenio";


@Injectable()
export class ConvenioService extends HeadersHelper {

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

    list(max?: any, offset?: any): Observable<any[]> {
        let subject = new Subject<Convenio[]>();
        this.http.get(this.baseUrl + `convenio?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any[]) => {
            if (!json.hasOwnProperty('error')){
                subject.next(json.map((obj: any) => new Convenio(obj)));
            } else{
                subject.next(json);
            }
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

    get(id: number): Observable<any> {
        let subject = new Subject<Convenio>();
        this.http.get(this.baseUrl + `convenio/` + id, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any) => {
            if (json.hasOwnProperty('error')) {
                subject.next(json);
            } else {
                subject.next(new Convenio(json));
            }
        });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Convenio[]>();
        this.http.get(this.baseUrl + `convenio/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).pipe(
            catchError(error => of({error})
            )).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Convenio(obj)))
                }
        });
        return subject.asObservable();
    }

    save(convenio: Convenio): Observable<any> {
        let subject = new Subject<Convenio>();
        if (convenio.id){
            this.http.put<Convenio>(this.baseUrl + `convenio/` + convenio.id, convenio, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Convenio(obj)))
                }
            });
        }else{
            this.http.post<Convenio>(this.baseUrl + `convenio/`, convenio, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Convenio(obj)))
                }
            });
        }
        return subject.asObservable()
    }


    destroy(convenio: Convenio): Observable<any> {
        let subject = new Subject<Convenio>();

        this.http.delete(this.baseUrl + `convenio/` + convenio.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        }).pipe(
            catchError(error => of({error}))
        ).subscribe((json: any) => {
            if(json.hasOwnProperty('error')){
                subject.next(json)
            }else{
                subject.next(json.map((obj: any) => new Convenio(obj)))
            }
        });
        return subject.asObservable()
    }
}
