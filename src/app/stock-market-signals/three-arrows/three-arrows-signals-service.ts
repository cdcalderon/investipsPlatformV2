import { Injectable} from '@angular/core'
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import * as _ from 'lodash';
import {ISignalsThreeArrow} from "./ISignalsThreeArrow";

@Injectable()
export class ThreeArrowsService {
     private _stockEQuotesUrl = 'http://localhost:4000/api/threearrowsignals';
    //private _stockEQuotesUrl = 'https://warm-journey-46979.herokuapp.com/api/threearrowsignals';
    constructor(private _http: Http) { }

    getStockSignals(from: Date, to: Date, pagingInfo: any, gapsQuery: any): Observable<ISignalsThreeArrow> {
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

        return this._http.post(this._stockEQuotesUrl+ '/filter', JSON.stringify(dbQuery), {headers: headers})
            .map((response: Response) =>  {
                return <ISignalsThreeArrow> response.json();
            })
            .do(data => console.log('Three arrow Signals: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }


    getGroupedSignalsBySymbol(stockSignals: ISignalsThreeArrow) {
        return _(stockSignals.docs)
            .groupBy(x => x.symbol)
            .map((value, key) => ({
                symbol: key,
                quantity: value.length,
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
