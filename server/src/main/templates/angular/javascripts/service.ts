import {Injectable} from '@angular/core';
import { ${className} } from './${propertyName}';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class ${className}Service {

    private baseUrl = environment.serverUrl;
    httpOptions = {
        headers: new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
        })
    };

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<${className}[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}?offset=` + offset + '&max=' + max, {headers: this.httpOptions.headers})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new ${className}(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<${className}[]>(this.baseUrl + `${propertyName}/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<${className}> {
        let subject = new Subject<${className}>();
        this.http.get(this.baseUrl + `${propertyName}/` + id, {headers: this.httpOptions.headers})
            .subscribe((json: any) => {
                subject.next(new ${className}(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}/` + '?offset=' + offset + '&max=' + max, {
            headers: this.httpOptions.headers,
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            console.log(json);
            subject.next(json.map((obj: any) => new ${className}(obj)))
        });
        return subject.asObservable();
    }

    save(${propertyName}: ${className}): Observable<${className}> {
        if (${propertyName}.id) {
            return this.http.put<${className}>(this.baseUrl + `${propertyName}/` + ${propertyName}.id, ${propertyName}, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        } else {
            return this.http.post<${className}>(this.baseUrl + `${propertyName}/`, ${propertyName}, {
                headers: this.httpOptions.headers,
                responseType: 'json'
            });
        }
    }


    destroy(${propertyName}: ${className}): Observable<Object> {
        return this.http.delete(this.baseUrl + `${propertyName}/` + ${propertyName}.id, {
            headers: this.httpOptions.headers,
            observe: 'response'
        });
    }
}