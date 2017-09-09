import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import {SecurityWidgetDefinition} from "./SecurityWidgetDefinition";

@Injectable()
export class PaidMemberChartStudiesService {
    private _investipsServerWebAPIBaseUrl = environment.investipsServerWebAPIBaseUrl;

    constructor(private _http: Http) { }

    getMemberStudies(securityId: number) : Observable<SecurityWidgetDefinition> {
        return this._http.get(`${this._investipsServerWebAPIBaseUrl}/api/securitywidgets/${securityId}`)
            .map((response: Response) =>  {
                return <SecurityWidgetDefinition> response.json();
            })
            .do(data => console.log('All paid members studies: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}