import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {PacienteAgendado} from "./pacienteAgendado";


@Injectable()
export class PacienteAgendadoService extends HeadersHelper {

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
        let subject = new Subject<PacienteAgendado[]>();
        this.http.get(this.baseUrl + `pacienteAgendado?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any[]) => {
            if (!json.hasOwnProperty('error')){
                subject.next(json.map((obj: any) => new PacienteAgendado(obj)));
            } else{
                subject.next(json);
            }
        });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<PacienteAgendado[]>(this.baseUrl + `pacienteAgendado/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<any> {
        let subject = new Subject<PacienteAgendado>();
        this.http.get(this.baseUrl + `pacienteAgendado/` + id, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any) => {
            if (json.hasOwnProperty('error')) {
                subject.next(json);
            } else {
                subject.next(new PacienteAgendado(json));
            }
        });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<PacienteAgendado[]>();
        this.http.get(this.baseUrl + `pacienteAgendado/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).pipe(
            catchError(error => of({error})
            )).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new PacienteAgendado(obj)))
                }
        });
        return subject.asObservable();
    }

    save(pacienteAgendado: PacienteAgendado): Observable<any> {
        let subject = new Subject<PacienteAgendado>();
        if (pacienteAgendado.id){
            this.http.put<PacienteAgendado>(this.baseUrl + `pacienteAgendado/` + pacienteAgendado.id, pacienteAgendado, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new PacienteAgendado(obj)))
                }
            });
        }else{
            this.http.post<PacienteAgendado>(this.baseUrl + `pacienteAgendado/`, pacienteAgendado, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new PacienteAgendado(obj)))
                }
            });
        }
        return subject.asObservable()
    }


    destroy(pacienteAgendado: PacienteAgendado): Observable<any> {
        let subject = new Subject<PacienteAgendado>();

        this.http.delete(this.baseUrl + `pacienteAgendado/` + pacienteAgendado.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        }).pipe(
            catchError(error => of({error}))
        ).subscribe((json: any) => {
            if(json.hasOwnProperty('error')){
                subject.next(json)
            }else{
                subject.next(json.map((obj: any) => new PacienteAgendado(obj)))
            }
        });
        return subject.asObservable()
    }
}
