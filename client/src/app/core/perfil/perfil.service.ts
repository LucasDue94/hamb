import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Perfil} from "./perfil";


@Injectable()
export class PerfilService extends HeadersHelper {

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
        let subject = new Subject<Perfil[]>();
        this.http.get(this.baseUrl + `perfil?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any[]) => {
            if (!json.hasOwnProperty('error')){
                subject.next(json.map((obj: any) => new Perfil(obj)));
            } else{
                subject.next(json);
            }
        });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Perfil[]>(this.baseUrl + `perfil/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<any> {
        let subject = new Subject<Perfil>();
        this.http.get(this.baseUrl + `perfil/` + id, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any) => {
            if (json.hasOwnProperty('error')) {
                subject.next(json);
            } else {
                subject.next(new Perfil(json));
            }
        });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Perfil[]>();
        this.http.get(this.baseUrl + `perfil/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).pipe(
            catchError(error => of({error})
            )).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Perfil(obj)))
                }
        });
        return subject.asObservable();
    }

    save(perfil: Perfil): Observable<any> {
        let subject = new Subject<Perfil>();
        if (perfil.id){
            this.http.put<Perfil>(this.baseUrl + `perfil/` + perfil.id, perfil, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Perfil(obj)))
                }
            });
        }else{
            this.http.post<Perfil>(this.baseUrl + `perfil/`, perfil, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new Perfil(obj)))
                }
            });
        }
        return subject.asObservable()
    }


    destroy(perfil: Perfil): Observable<any> {
        let subject = new Subject<Perfil>();

        this.http.delete(this.baseUrl + `perfil/` + perfil.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        }).pipe(
            catchError(error => of({error}))
        ).subscribe((json: any) => {
            if(json.hasOwnProperty('error')){
                subject.next(json)
            }else{
                subject.next(json.map((obj: any) => new Perfil(obj)))
            }
        });
        return subject.asObservable()
    }
}
