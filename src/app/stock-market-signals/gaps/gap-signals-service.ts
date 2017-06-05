import { Injectable} from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IGapSignal } from './IGapSignals';

import * as _ from 'lodash';

@Injectable()
export class GapSignalsService {
    private _stockEQuotesUrl = 'http://localhost:4000/api/gapsignals';

    constructor(private _http: Http) { }

    getGapSignals(from: string, to: string, symbol: string): Observable<IGapSignal[]> {
        const params = new URLSearchParams();
        params.set('to', to);
        params.set('from', from);
        params.set('symbol', symbol);

        return this._http.get(this._stockEQuotesUrl, { search: params })
            .map((response: Response) =>  {
                return <IGapSignal[]> response.json()
            })
            .do(data => console.log('All Signals: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getGroupedSignalsBySymbol(stockSignals: IGapSignal[]) {
        return _(stockSignals)
            .groupBy(x => x.symbol)
            .map((value, key) => ({
                symbol: key,
                quantity: value.length,
                signals: value
            }))
            .value();
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

}
