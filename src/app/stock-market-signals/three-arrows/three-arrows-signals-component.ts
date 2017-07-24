import {Component, OnInit } from '@angular/core';
import {ThreeArrowsService} from './three-arrows-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IThreeArrowSignal} from './IThreeArrowSignal';
import * as _ from 'lodash';
import {IFilterCriteria} from "../../shared/filter-criteria-model";
import {ISignalsThreeArrow} from "./ISignalsThreeArrow";

@Component({
    selector: 'app-three-arrows',
    templateUrl: './three-arrows-signals-component.html',
    styleUrls: ['./three-arrows-signals-component.scss']
})
export class ThreeArrowsComponent implements OnInit {
    errorMessage: string;
    stockSignals: ISignalsThreeArrow;
    selectedSignal: IThreeArrowSignal;
    groupedSignals: any;
    marksType= 'gap';
    filterCriteria: IFilterCriteria;
    gapsQuery: any = {};
    pageSize = 25;
    currentPage = 1;
    totalSignalsInCurrentPage: number;
    totalGaps = 0;
    numberOfPages: number;


    constructor(private _stockSignalsService: ThreeArrowsService,
                private _router: Router) {

    }

    ngOnInit() {
        let pagingInfo = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };

        this._stockSignalsService.getStockSignals(null, null, pagingInfo, {})
            .subscribe(
                stockSignals => {
                    this.stockSignals = stockSignals;
                    this.groupedSignals =
                        _.orderBy(this._stockSignalsService.getGroupedSignalsBySymbol(this.stockSignals), ['close'], ['desc']);
                    this.totalGaps = stockSignals.total;
                    this.numberOfPages = Math.ceil(stockSignals.total / this.pageSize);
                    this.totalSignalsInCurrentPage = stockSignals.docs.length;
                    console.log("signals");
                    console.log(this.groupedSignals);
                },
                error => this.errorMessage = <any>error
            );

    }

    onSignalSelect(event) {
        console.log(event.data);
        this._router.navigate(['/marketchart', event.data.symbol, 'greenarrows']);
    }

    navigateToChart(signal:any) {
        console.log(signal.symbol);
        this._router.navigate(['/marketchart', signal.symbol, 'greenarrows']);
        // window.location.href = `http://localhost:4200/stockquote/${signal.symbol}`;
    }

    searchThreeArrowSignals(filterCriteria: IFilterCriteria) {
        this.filterCriteria = filterCriteria;

        this.gapsQuery = this.createQueryFilter(this.filterCriteria);
        const from = filterCriteria.from;
        const to = filterCriteria.to;
        let pagingInfo = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };

        this._stockSignalsService.getStockSignals(from, to, pagingInfo, this.gapsQuery)
            .subscribe(
                stockSignals => {
                    this.stockSignals = stockSignals;
                    this.groupedSignals =
                        _.orderBy(this._stockSignalsService.getGroupedSignalsBySymbol(this.stockSignals), ['close'], ['desc']);
                    console.log(this.groupedSignals);
                    this.totalGaps = stockSignals.total;
                    this.numberOfPages = Math.ceil(stockSignals.total / this.pageSize);
                    this.totalSignalsInCurrentPage = stockSignals.docs.length;
                    console.log(this.totalGaps);
                    console.log(this.groupedSignals);
                },
                error => this.errorMessage = <any>error
            );
    }

    createQueryFilter(filterCriterial: IFilterCriteria) {
        let queryFilter: any = {};
        if(filterCriterial.exchanges.length > 0){
            queryFilter.exchanges = filterCriterial.exchanges;
        }
        if(filterCriterial.caps.length > 0) {
            queryFilter.marketCaps = filterCriterial.caps;
        }
        if(filterCriterial.symbols.length > 0) {
            queryFilter.symbols = filterCriterial.symbols;
        }
        return queryFilter;
    }


}



