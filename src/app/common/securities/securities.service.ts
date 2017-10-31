import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';
import {ISecurity} from "./ISecurity";


@Injectable()
export class SecuritiesService {

    constructor(private _http: HttpClient) { }

    private _securityUrl = './assets/api/securities/securities.json';

    getSecurities(): Observable<ISecurity[]> {
        return this._http.get<ISecurity[]>(this._securityUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

}
