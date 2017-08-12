import {Component, OnInit, ViewChild} from '@angular/core';
import {ThreeArrowsService} from './three-arrows-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IThreeArrowSignal} from './IThreeArrowSignal';
import * as _ from 'lodash';
import {IFilterCriteria} from "../../shared/filter-criteria-model";
import {ISignalsThreeArrow} from "./ISignalsThreeArrow";
import {Paginator} from 'primeng/primeng';

@Component({
    selector: 'app-three-arrows',
    templateUrl: './three-arrows-signals-component.html',
    styleUrls: ['./three-arrows-signals-component.scss']
})
export class ThreeArrowsComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    errorMessage: string;
    stockSignals: ISignalsThreeArrow;
    selectedSignal: IThreeArrowSignal;
    groupedSignals: any;
    marksType= 'gap';
    filterCriteria: IFilterCriteria;
    threeArrowSignalsQuery: any = {};
    pageSize = 25;
    currentPage = 1;
    totalSignalsInCurrentPage: number;
    totalThreeArrowSignals = 0;
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
                    this.totalThreeArrowSignals = stockSignals.total;
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
    }

    paginate(event) {
        this.currentPage = event.page + 1;
        console.log(event);
        this.searchThreeArrowSignals(this.filterCriteria, 'paginator');
    }

    searchThreeArrowSignals(filterCriteria: IFilterCriteria, source: string) {
        if(source === 'filter') {
            this.currentPage = 1;
            this.paginator.first = 0;
        }
        this.filterCriteria = filterCriteria;

        this.threeArrowSignalsQuery = this.createQueryFilter(this.filterCriteria);
        const from = filterCriteria != null ? filterCriteria.from : null;
        const to = filterCriteria != null ? filterCriteria.to: null;
        let pagingInfo = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };

        this._stockSignalsService.getStockSignals(from, to, pagingInfo, this.threeArrowSignalsQuery)
            .subscribe(
                stockSignals => {
                    this.stockSignals = stockSignals;
                    this.groupedSignals =
                        _.orderBy(this._stockSignalsService.getGroupedSignalsBySymbol(this.stockSignals), ['close'], ['desc']);
                    this.totalThreeArrowSignals = stockSignals.total;
                    this.numberOfPages = Math.ceil(stockSignals.total / this.pageSize);
                    this.totalSignalsInCurrentPage = stockSignals.docs.length;
                    console.log("signals");
                    console.log(this.groupedSignals);
                },
                error => this.errorMessage = <any>error
            );

    }


    createQueryFilter(filterCriterial: IFilterCriteria) {
        let queryFilter: any = {};
        if(filterCriterial){
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


}



