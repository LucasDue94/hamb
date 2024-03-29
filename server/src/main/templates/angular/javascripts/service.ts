import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {HeadersHelper} from "../headersHelper";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";


@Injectable()
export class ${className}Service extends HeadersHelper {

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
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any[]) => {
            if (!json.hasOwnProperty('error')){
                subject.next(json.map((obj: any) => new ${className}(obj)));
            } else{
                subject.next(json);
            }
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

    get(id: number): Observable<any> {
        let subject = new Subject<${className}>();
        this.http.get(this.baseUrl + `${propertyName}/` + id, {headers: this.getDefaultHttpOptions()})
            .pipe(
                catchError(error => of({error})
                )).subscribe((json: any) => {
            if (json.hasOwnProperty('error')) {
                subject.next(json);
            } else {
                subject.next(new ${className}(json));
            }
        });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).pipe(
            catchError(error => of({error})
            )).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new ${className}(obj)))
                }
        });
        return subject.asObservable();
    }

    save(${propertyName}: ${className}): Observable<any> {
        let subject = new Subject<${className}>();
        if (${propertyName}.id){
            this.http.put<${className}>(this.baseUrl + `${propertyName}/` + ${propertyName}.id, ${propertyName}, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new ${className}(obj)))
                }
            });
        }else{
            this.http.post<${className}>(this.baseUrl + `${propertyName}/`, ${propertyName}, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            }).pipe(
                catchError(error => of({error}))
            ).subscribe((json: any) => {
                if(json.hasOwnProperty('error')){
                    subject.next(json)
                }else{
                    subject.next(json.map((obj: any) => new ${className}(obj)))
                }
            });
        }
        return subject.asObservable()
    }


    destroy(${propertyName}: ${className}): Observable<any> {
        let subject = new Subject<${className}>();

        this.http.delete(this.baseUrl + `${propertyName}/` + ${propertyName}.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        }).pipe(
            catchError(error => of({error}))
        ).subscribe((json: any) => {
            if(json.hasOwnProperty('error')){
                subject.next(json)
            }else{
                subject.next(json.map((obj: any) => new ${className}(obj)))
            }
        });
        return subject.asObservable()
    }
}