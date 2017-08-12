import {Injectable} from "@angular/core";
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class StockSymbolService {
    private stockUDFApiUrlBase = environment.stockMarketUDFApiBaseUrl;
    //private symbsymbolsURLolsURL = 'http://localhost:4600';
    constructor(private _http: Http){}

    getSymbols(partial: string) : Observable<string[]> {
        return this._http.get(`${this.stockUDFApiUrlBase}/api/udf/symbolspartial?part=${partial}`, )
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