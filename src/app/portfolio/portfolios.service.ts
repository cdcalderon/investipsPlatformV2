import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {HttpErrorResponse} from "@angular/common/http";
import {IPortfolio} from "./IPortfolio";


@Injectable()
export class PortfoliosService {

  private _portfolioUrl = `${environment.investipsDotnetApi}/api/portfolios/`;

  constructor(private _http: Http) { }

  createPortfolio(portfolio) {
    return this._http.post(this._portfolioUrl, JSON.stringify(portfolio))
        .map(response => {return <IPortfolio> response.json()})
        .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}
