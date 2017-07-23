
import {Injectable} from "@angular/core";
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockSymbolService {
    private symbolsURL = 'http://localhost:4600/api/udf/symbolspartial?part=';
    constructor(private _http: Http){}

    getSymbols(partial: string) : Observable<string[]> {
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
}