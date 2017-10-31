import { Component, OnInit } from '@angular/core';
import {SecuritiesService} from "../common/securities/securities.service";
import {ISecurity} from "../common/securities/ISecurity";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioList: any = [];
  securities: ISecurity[] = [];
  errorMessage: any;

  constructor(private _securityService: SecuritiesService) { }

  ngOnInit() {
    this._securityService.getSecurities().subscribe(
        securities => this.securities = securities,
        error => this.errorMessage = <any>error);
  }

}
