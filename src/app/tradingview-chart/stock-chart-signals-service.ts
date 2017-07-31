import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import * as _ from 'lodash';
import {IStockChartSignal} from './IStockChartSignal';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class StockChartSignalsService {
    // private _stockGapSignalsUrl = 'https://warm-journey-46979.herokuapp.com/api/gapsignals';
    // private _stockThreeArrowSignalsUrl = 'https://warm-journey-46979.herokuapp.com/api/threearrowsignals';

    // private _stockGapSignalsUrl = 'http://localhost:4000/api/udf/marksgapswithpreviousquote';
    // private _stockThreeArrowSignalsUrl = 'http://localhost:4000/api/udf/marksgreenarrowsprojections';
   private _stockGapSignalsUrl = 'https://warm-journey-46979.herokuapp.com/api/udf/marksgapswithpreviousquote';
   private _stockThreeArrowSignalsUrl = 'https://warm-journey-46979.herokuapp.com/api/udf/marksgreenarrowsprojections';


    fourMonthAgo = Math.floor(new Date().valueOf() / 1000 - 4 * 30 * 24 * 60 * 60);
    today = Math.floor(new Date().valueOf() / 1000);
    constructor(private _http: Http) { }
    getGapSignals(from: string, to: string, symbol: string): Observable<IStockChartSignal[]> {
        const params = new URLSearchParams();
        params.set('to', to);
        params.set('from', from);
        params.set('symbol', symbol);

        return this._http.get(this._stockGapSignalsUrl, { search: params })
            .map((response: Response) =>  {
                return <IStockChartSignal[]> response.json();
            })
            .do(data => console.log('All marksgapswithpreviousquote: ' + JSON.stringify(data)))
            .catch(this.handleError);
        // const subject = new Subject<IStockChartSignal>();
        // setTimeout(() => {
        //     subject.next({
        //         confirmationPrice: 135,
        //         confirmationDate: 1473724800,
        //         goalPrice: 150,
        //         goalDate: 1485993600
        // });
        //     subject.complete();
        // }, 1000);
        // return subject;
    }

    getThreeArrowSignals(from: string, to: string, symbol: string): Observable<IStockChartSignal[]> {
        const params = new URLSearchParams();
        params.set('to', to);
        params.set('from', from);
        params.set('symbol', symbol);

        return this._http.get(this._stockThreeArrowSignalsUrl, { search: params })
            .map((response: Response) =>  {
                return <IStockChartSignal[]> response.json();
            })
            .do(data => console.log('All marksgreenarrowsprojections: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}
//
// 1473724800,
//     1485993600,
//     1491177600
