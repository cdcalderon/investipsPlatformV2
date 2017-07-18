import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IGapSignal } from './IGapSignals';
import {SignalsInfo} from './SignalsInfo';

import * as _ from 'lodash';
import {IGapQuote} from "./IGapQuote";

@Injectable()
export class GapSignalsService {
     private _stockEQuotesUrl = 'http://localhost:4000/api/gapsignals';
    //private _stockEQuotesUrl = 'https://warm-journey-46979.herokuapp.com/api/gapsignals';
   // private _gapsHistoricals = 'https://warm-journey-46979.herokuapp.com/api/udf/historicalgaps';
    private _gapsHistoricals = 'http://localhost:4000/api/udf/historicalgaps';

    private symbolsURL = 'http://localhost:4600/api/udf/symbolspartial?part=';


    constructor(private _http: Http) { }

    getGapSignals(from: string, to: string, pagingInfo: any): Observable<SignalsInfo> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new URLSearchParams();
        let toDate: any;
        let fromDate: any;
        if(!from || !to) {
            toDate =  this.monthAdd(new Date(), 0);
            fromDate = this.monthAdd(new Date(), -1);
        } else {
            fromDate = this.monthAdd(new Date(from), -1);
            toDate =  this.monthAdd(new Date(to), 0);
        }

        let dbQuery = {
            exchange: 'NasdaqNM',
            pagingInfo: pagingInfo,
            from: fromDate,
            to: toDate
        };

      //  return this._http.get(this._stockEQuotesUrl, { search: params })
        return this._http.post(this._stockEQuotesUrl + '/filter', JSON.stringify(dbQuery), {headers: headers})
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

        return this._http.get(this._gapsHistoricals, { search: params })
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
                signals: value,
                quantity: value.length,
                close: value[value.length - 1].close
            }))
            .value();
    }

    getGapSymbols(partial: string) : Observable<string[]> {
        return this._http.get(this.symbolsURL + partial, )
            .map((response: Response) =>  {
                return <string[]> response.json();
            })
            .do(data => console.log('filterted Symbols: ' + JSON.stringify(data)))
            .catch(this.handleError);
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
