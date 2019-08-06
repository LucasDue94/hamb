import {Injectable} from '@angular/core';
import {Paciente} from './paciente';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class PacienteService {

    private baseUrl = environment.serverUrl;
    httpOptions = {
        headers: new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
        })
    };

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Paciente[]> {
        let subject = new Subject<Paciente[]>();
        this.http.get(this.baseUrl + `paciente?offset=` + offset + '&max=' + max, {headers: this.httpOptions.headers})
            .subscribe((json: any[]) => {
                subject.next(json.map((paciente: any) => new Paciente(paciente)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Paciente[]>(this.baseUrl + `paciente/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Paciente> {
        let subject = new Subject<Paciente>();
        this.http.get(this.baseUrl + `paciente/` + id, {headers: this.httpOptions.headers})
            .subscribe((json: any) => {
                subject.next(new Paciente(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Paciente[]>();
        this.http.get(this.baseUrl + `paciente/` + '?offset=' + offset + '&max=' + max, {
            headers: this.httpOptions.headers,
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Paciente(obj)))
        });
        return subject.asObservable();
    }

    save(paciente: Paciente): Observable<Paciente> {
        if (paciente.id) {
            return this.http.put<Paciente>(this.baseUrl + `paciente/` + paciente.id, paciente, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        } else {
            return this.http.post<Paciente>(this.baseUrl + `paciente/`, paciente, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }


    destroy(paciente: Paciente): Observable<Object> {
        return this.http.delete(this.baseUrl + `paciente/` + paciente.id, {
            headers: this.httpOptions.headers,
            observe: 'response'
        });
    }
}
