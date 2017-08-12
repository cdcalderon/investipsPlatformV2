import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IGapSignal } from './IGapSignals';
import {SignalsInfo} from './SignalsInfo';
import { environment } from '../../../environments/environment';

import * as _ from 'lodash';
import {IGapQuote} from "./IGapQuote";

@Injectable()
export class GapSignalsService {
   // private _stockEQuotesUrl = 'http://localhost:4000/api/gapsignals';
    private _stockQuotesAndIndicatorssUrlBase = environment.stockMarketQuotesWithIndicatorsApiBaseUrl;
    //private _gapsHistoricals = 'https://warm-journey-46979.herokuapp.com/api/udf/historicalgaps';
   // private _gapsHistoricals = 'http://localhost:4000/api/udf/historicalgaps';

    constructor(private _http: Http) { }

    getGapSignals(from: Date, to: Date, pagingInfo: any, gapsQuery: any): Observable<SignalsInfo> {
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

      //  return this._http.get(this._stockEQuotesUrl, { search: params })
        return this._http.post(`${this._stockQuotesAndIndicatorssUrlBase}/api/gapsignals/filter`, JSON.stringify(dbQuery), {headers: headers})
            .map((response: Response) =>  {
                return <SignalsInfo[]> response.json();
            })
            .do(data => console.log('All Signals: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getHistoricalGaps(from: string, to: string, symbol: string): Observable<IGapQuote[]> {
        const params = new URLSearchParams();
        params.set('to', to);
        params.set('from', from);
        params.set('symbol', symbol);

        return this._http.get(`${this._stockQuotesAndIndicatorssUrlBase}/api/udf/historicalgaps`, { search: params })
            .map((response: Response) =>  {
                return <IGapQuote[]> response.json();
            })
            .do(data => console.log('All Signals: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getGroupedSignalsBySymbol(stockSignals: SignalsInfo) {
        return _(stockSignals.docs)
            .groupBy(x => x.symbol)
            .map((value, key) => ({
                symbol: key,
                exchange: value[0].exchange,
                sector: value[0].sector,
                industry: value[0].industry,
                marketCap: value[0].marketCap,
                signals: value,
                quantity: value.length,
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
