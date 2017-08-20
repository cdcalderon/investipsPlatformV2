import { Injectable} from '@angular/core'
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

import * as _ from 'lodash';
import {ISignalsStoch307Info} from "./ISignalsStoch307Info";

@Injectable()
export class Stoch307SignalsService {
    //private _stockEQuotesUrl = 'http://localhost:4000/api/threearrowsignals';
    private _stockQuotesAndIndicatorsApiUrlBase = environment.stockMarketQuotesWithIndicatorsApiBaseUrl;

    constructor(private _http: Http) { }

    getStoch307Signals(from: Date, to: Date, pagingInfo: any, gapsQuery: any): Observable<ISignalsStoch307Info> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new URLSearchParams();
        let toDate: any;
        let fromDate: any;
        if(!from || !to) {
            toDate =  this.monthAdd(new Date(), 0);
            fromDate = this.monthAdd(new Date(), -10);
        } else {
            fromDate = this.monthAdd(from, 0);
            toDate =  this.monthAdd(to, 0);
        }

        let dbQuery = {
            query: gapsQuery,
            exchange: 'NasdaqNM',
            pagingInfo: pagingInfo,
            from: fromDate,
            to: toDate
        };

        return this._http.post(`${this._stockQuotesAndIndicatorsApiUrlBase}/api/signals/stoch307/bullwithfilter`, JSON.stringify(dbQuery), {headers: headers})
            .map((response: Response) =>  {
                return <ISignalsStoch307Info> response.json();
            })
            .do(data => console.log('Stoch 307 Signals: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getGroupedStoch307BySymbol(stockSignals: ISignalsStoch307Info) {
        return _(stockSignals.docs)
            .groupBy(x => x.symbol)
            .map((value, key) => ({
                symbol: key,
                exchange: value[0].exchange,
                sector: value[0].sector,
                industry: value[0].industry,
                marketCap: value[0].marketCap,
                //movingExAvg30PositiveSlope: value.movingExAvg30PositiveSlope,
                signals: value,
                close: value[value.length - 1].close
            }))
            .value();
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    monthAdd(date, month) {
        let temp;
        temp = new Date(date.getFullYear(), date.getMonth(), 1);
        temp.setMonth(temp.getMonth() + (month + 1));
        temp.setDate(temp.getDate() - 1);
        if (date.getDate() < temp.getDate()) {
            temp.setDate(date.getDate());
        }

        return temp / 1000;

    }

}
