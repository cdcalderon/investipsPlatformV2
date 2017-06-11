import {
    Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,
    Input
} from '@angular/core';
import {Http} from '@angular/http';
import {ThreeArrowsService} from './three-arrows-signals-service';
import {ActivatedRoute, Router} from '@angular/router';
import {IThreeArrowSignal} from './IThreeArrowSignal';

@Component({
    selector: 'app-three-arrows',
    templateUrl: './three-arrows-signals-component.html',
    styleUrls: ['./three-arrows-signals-component.scss']
})
export class ThreeArrowsComponent implements OnInit {
    errorMessage: string;
    stockSignals: IThreeArrowSignal[];
    selectedSignal: IThreeArrowSignal;
    groupedSignals: any;
    marksType= 'gap';


    constructor(private _stockSignalsService: ThreeArrowsService,
                private _router: Router) {

    }

    ngOnInit() {
        const from = '01/01/16';
        const to = '01/01/17';
        this._stockSignalsService.getStockSignals(from, to, 'aapl')
            .subscribe(
                stockSignals => {
                    this.stockSignals = stockSignals;
                    this.groupedSignals =
                        this._stockSignalsService.getGroupedSignalsBySymbol(this.stockSignals);
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
}



