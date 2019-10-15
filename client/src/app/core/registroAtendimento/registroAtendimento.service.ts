import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {RegistroAtendimento} from "./registroAtendimento";


@Injectable()
export class RegistroAtendimentoService extends HeadersHelper {

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
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get(this.baseUrl + `registroAtendimento?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any[]) => {
            if (!json.hasOwnProperty('error')){
                subject.next(json.map((obj: any) => new RegistroAtendimento(obj)));
            } else{
                subject.next(json);
            }
        });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<RegistroAtendimento[]>(this.baseUrl + `registroAtendimento/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<any> {
        let subject = new Subject<RegistroAtendimento>();
        this.http.get(this.baseUrl + `registroAtendimento/` + id, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any) => {
            if (json.hasOwnProperty('error')) {
                subject.next(json);
            } else {
                subject.next(new RegistroAtendimento(json));
            }
        });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get(this.baseUrl + `registroAtendimento/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).pipe(
            catchError(error => of({error})
            )).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
                }
        });
        return subject.asObservable();
    }

    save(registroAtendimento: RegistroAtendimento): Observable<any> {
        let subject = new Subject<RegistroAtendimento>();
        if (registroAtendimento.id){
            this.http.put<RegistroAtendimento>(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, registroAtendimento, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
                }
            });
        }else{
            this.http.post<RegistroAtendimento>(this.baseUrl + `registroAtendimento/`, registroAtendimento, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
                }
            });
        }
        return subject.asObservable()
    }


    destroy(registroAtendimento: RegistroAtendimento): Observable<any> {
        let subject = new Subject<RegistroAtendimento>();

        this.http.delete(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        }).pipe(
            catchError(error => of({error}))
        ).subscribe((json: any) => {
            if(json.hasOwnProperty('error')){
                subject.next(json)
            }else{
                subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
            }
        });
        return subject.asObservable()
    }
}
