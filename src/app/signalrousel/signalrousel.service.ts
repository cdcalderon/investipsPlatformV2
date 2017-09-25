import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

import * as _ from 'lodash';
import {ISignalRousel} from "../common/signal/ISignalRousel";


@Injectable()
export class SignalrouselService {
  private _stockQuotesAndIndicatorssUrlBase = environment.stockMarketQuotesWithIndicatorsApiBaseUrl;

  constructor(private _http: Http) { }

  getTopSignals(from: number, to: number, symbols: string[]): Observable<ISignalRousel[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const params = new URLSearchParams()

    let query = {
      from: from,
      to: to,
      symbols: symbols
    };

    return this._http.post(`${this._stockQuotesAndIndicatorssUrlBase}/api/gapsignals/filter/ranking`, JSON.stringify(query), {headers: headers})
        .map((response: Response) =>  {
          return <ISignalRousel[]> response.json();
        })
        .do(data => console.log('All Signals: ' + JSON.stringify(data)))
        .catch(this.handleError);

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

}
