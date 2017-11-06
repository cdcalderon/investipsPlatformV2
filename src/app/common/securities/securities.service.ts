import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
//import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import {ISecurity} from "./ISecurity";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export class SecuritiesService {
    private _securityUrl = `${environment.stockMarketUDFApiBaseUrl}/api/securities/filter`;

    constructor(private _http: Http) { }

    getSecurities(filterQuery: any): Observable<ISecurity[]> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new URLSearchParams();

        return this._http.post(this._securityUrl, JSON.stringify(filterQuery), {headers: headers})
            .map((response: Response) =>  {
                return <ISecurity[]> response.json();
            })
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
