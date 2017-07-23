import { Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { GapSignalsService } from './gap-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IGapSignal} from './IGapSignals';
import {SignalsInfo} from './SignalsInfo';
import * as _ from 'lodash';
import {SelectItem} from 'primeng/primeng';
import {IFilterCriteria} from "../../shared/filter-criteria-model";

@Component({
    selector: 'app-gap-signals',
    templateUrl: './gap-signals-component.html',
    styleUrls: [ './gap-signals-component.scss']
})
export class GapSignalsComponent implements OnInit {
    currentFirst: number = 0;
    globalPageSize = 25;
    pageSize = 25;
    currentPage = 1;
    totalSignalsInCurrentPage: number;
    totalGaps = 0;
    numberOfPages: number;
    errorMessage: string;
    gapSignals: SignalsInfo;
    selectedGapSignal: IGapSignal;
    groupedSignals: any;
    filterCriteria: IFilterCriteria;



    exchanges: SelectItem[] = [
        {label:'NYSE', value: 'nyse'},
        {label:'NASDAQ',value:'nasdaq'},
        {label:'AMEX', value:'amex'}
    ];

    gapsQuery: any = {};
    constructor(private _gapSignalsService: GapSignalsService,
                private _router: Router) {}

    ngOnInit() {
        let pagingInfo = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };

        this._gapSignalsService.getGapSignals(null, null, pagingInfo, {})
                        .subscribe(
                            stockSignals => {
                                this.gapSignals = stockSignals;
                                this.groupedSignals =
                        _.orderBy(this._gapSignalsService.getGroupedSignalsBySymbol(this.gapSignals), ['close'], ['desc']);
                                this.totalGaps = stockSignals.total;
                                this.numberOfPages = Math.ceil(stockSignals.total / this.pageSize);
                                this.totalSignalsInCurrentPage = stockSignals.docs.length;
                                console.log(this.totalGaps);
                                console.log(this.groupedSignals);

                },
                error => this.errorMessage = <any>error
            );
    }

    onSignalSelect(event) {
        console.log(event.data);
        this._router.navigate(['/marketchart', event.data.symbol, 'gap']);
    }

    paginate(event) {
        this.currentPage = event.page + 1;
        console.log(event);
        this.searchGaps(this.filterCriteria);
    }

    navigateToChart(signal: any) {
        console.log(signal.symbol);
        // this._router.navigate(['/marketchart']);
        this._router.navigate(['/marketchart', signal.symbol, 'gap']);
        // window.location.href = `http://localhost:4200/marketchart`;
        // window.location.href = `http://localhost:4200/marketchart/${signal.symbol}`;
    }

    signalAppender(currentPage, totalSignals, pageSize, signalCollection) {
        if(signalCollection.length < pageSize) {
            this.pageSize = signalCollection.length;
        } else {
            this.pageSize = this.globalPageSize;
        }

        let offsetStartQuantity = pageSize * (currentPage -1);
        let offsetEndQuantity = totalSignals - (offsetStartQuantity + pageSize);

        let offsetStart = new Array(offsetStartQuantity).fill({symbol:''});
        let offsetEnd = new Array(offsetEndQuantity).fill({symbol:''});
        return [...offsetStart, ...signalCollection, ...offsetEnd];
    }

    searchGaps(filterCriteria: IFilterCriteria) {
        this.filterCriteria = filterCriteria;

        this.gapsQuery = this.createQueryFilter(this.filterCriteria);
        const from = filterCriteria.from;
        const to = filterCriteria.to;
        let pagingInfo = {
            pageSize: this.pageSize,
            currentPage: this.currentPage
        };

        this._gapSignalsService.getGapSignals(from, to, pagingInfo, this.gapsQuery)
            .subscribe(
                stockSignals => {
                    this.gapSignals = stockSignals;
                    this.groupedSignals =
                        _.orderBy(this._gapSignalsService.getGroupedSignalsBySymbol(this.gapSignals), ['close'], ['desc']);
                    this.totalGaps = stockSignals.total;
                    this.numberOfPages = Math.ceil(stockSignals.total / this.pageSize);
                    this.totalSignalsInCurrentPage = stockSignals.docs.length;
                    console.log(this.totalGaps);
                    console.log(this.groupedSignals);

                    // this.groupedSignals = this.signalAppender(this.currentPage,
                    //     this.totalGaps, this.pageSize, this.groupedSignals);
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

    filterGaps() {
        // this._gapSignalsService.getGapSignals(from, to, 'aapl')
        //     .subscribe(
        //         stockSignals => {
        //             this.gapSignals = stockSignals;
        //             this.groupedSignals =
        //                 _.orderBy(this._gapSignalsService.getGroupedSignalsBySymbol(this.gapSignals), ['close'], ['desc']);
        //             console.log(this.groupedSignals);
        //         },
        //         error => this.errorMessage = <any>error
        //     );
    }
}



