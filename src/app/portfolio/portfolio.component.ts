import {Component, OnInit } from '@angular/core';
import {SecuritiesService} from "../common/securities/securities.service";
import {ISecurity} from "../common/securities/ISecurity";
import {IFilterCriteria} from "../shared/filter-criteria-model";
import {AuthService} from "../auth/auth.service";
import {Message} from "primeng/primeng";
import {PortfoliosService} from "./portfolios.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioList: any = [];
  securities: ISecurity[] = [];
  errorMessage: any;

  filterCriteria: IFilterCriteria;
  securitiesQuery: any = {};
  msgs: Message[] = [];
  portfolioName: string;

  constructor(private _securityService: SecuritiesService,
              private _auth: AuthService,
              private _portfolioService: PortfoliosService) { }

  ngOnInit() {
    // this._securityService.getSecurities().subscribe(
    //     securities => this.securities = securities,
    //     error => this.errorMessage = <any>error);
  }

  searchSecurities(filterCriteria: IFilterCriteria, source: string) {
    this.filterCriteria = filterCriteria;

    this.securitiesQuery = this.createQueryFilter(this.filterCriteria);
    this._securityService.getSecurities(this.securitiesQuery).subscribe(
        securities => {
          this.securities = securities
        },
        error => this.errorMessage = <any>error);
  }

  createQueryFilter(filterCriterial: IFilterCriteria) {
    let queryFilter: any = {};
    if(filterCriterial) {
      if(filterCriterial.exchanges.length > 0){
        queryFilter.exchanges = filterCriterial.exchanges;
      }
      if(filterCriterial.caps.length > 0) {
        queryFilter.marketCaps = filterCriterial.caps;
      }
      if(filterCriterial.symbols.length > 0) {
        queryFilter.symbols = filterCriterial.symbols;
      }
      if(filterCriterial.lowPriceRange > 0){
        queryFilter.lowPriceRange = filterCriterial.lowPriceRange;
      }
      if(filterCriterial.highPriceRange > 0){
        queryFilter.highPriceRange = filterCriterial.highPriceRange;
      }
    }

    return queryFilter;
  }

  savePortfolio() {
    if(this._auth.profile && this._auth.isAuthenticated()) {
      let profile =this._auth.profile;
      let portfolio = {
        name: this.portfolioName,
        securities: this.portfolioList,
        email: profile.email
      };
      this._portfolioService.createPortfolio(portfolio);
      this.showSuccess(this._auth.profile.name);
    } else {
      this._auth.login();
    }
  }

  showSuccess(message: string) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Portfolio', detail: message});
  }

}
