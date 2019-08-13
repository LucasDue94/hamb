import {Injectable} from '@angular/core';
import { PacienteAgendado } from './pacienteAgendado';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";


@Injectable()
export class PacienteAgendadoService extends  HeadersHelper{

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

    list(max?: any, offset?: any): Observable<PacienteAgendado[]> {
        let subject = new Subject<PacienteAgendado[]>();
        this.http.get(this.baseUrl + `pacienteAgendado?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new PacienteAgendado(propertyName)))
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

    get(id: number): Observable<PacienteAgendado> {
        let subject = new Subject<PacienteAgendado>();
        this.http.get(this.baseUrl + `pacienteAgendado/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new PacienteAgendado(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<PacienteAgendado[]>();
        this.http.get(this.baseUrl + `pacienteAgendado/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            console.log(json);
            subject.next(json.map((obj: any) => new PacienteAgendado(obj)))
        });
        return subject.asObservable();
    }

    save(pacienteAgendado: PacienteAgendado): Observable<PacienteAgendado> {
        if (pacienteAgendado.id) {
            return this.http.put<PacienteAgendado>(this.baseUrl + `pacienteAgendado/` + pacienteAgendado.id, pacienteAgendado, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<PacienteAgendado>(this.baseUrl + `pacienteAgendado/`, pacienteAgendado, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(pacienteAgendado: PacienteAgendado): Observable<Object> {
        return this.http.delete(this.baseUrl + `pacienteAgendado/` + pacienteAgendado.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}