import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioList: any = [];
  constructor() { }

  ngOnInit() {
    this.portfolioList = [{
      symbol: 'AAPL'
    },{
      symbol: 'MSFT'
    }
    ];
  }

}
