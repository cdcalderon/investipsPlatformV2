import { Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import { GapSignalsService } from './gap-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IGapSignal} from './IGapSignals';

@Component({
    selector: 'app-gap-signals',
    templateUrl: './gap-signals-component.html',
    styleUrls: [ './gap-signals-component.scss']
})
export class GapSignalsComponent implements OnInit {
    errorMessage: string;
    gapSignals: IGapSignal[];
    selectedGapSignal: IGapSignal;
    groupedSignals: any;


    constructor(private _gapSignalsService: GapSignalsService,
                private _router: Router) {

    }

    ngOnInit() {
        const from = '01/01/16';
        const to = '01/01/17';
        this._gapSignalsService.getGapSignals(from, to, 'aapl')
            .subscribe(
                stockSignals => {
                    this.gapSignals = stockSignals;
                    this.groupedSignals =
                        this._gapSignalsService.getGroupedSignalsBySymbol(this.gapSignals);
                    console.log(this.groupedSignals);
                },
                error => this.errorMessage = <any>error
            );

    }

    onSignalSelect(event) {
        console.log(event.data);
        this._router.navigate(['/marketchart', event.data.symbol, 'gap']);
    }

    navigateToChart(signal: any) {
        console.log(signal.symbol);
        // this._router.navigate(['/marketchart']);
        this._router.navigate(['/marketchart', signal.symbol, 'gap']);
        // window.location.href = `http://localhost:4200/marketchart`;
        // window.location.href = `http://localhost:4200/marketchart/${signal.symbol}`;
    }
}



