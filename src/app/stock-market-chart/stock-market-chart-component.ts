import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver,Inject,forwardRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppComponent} from '../app.component';
declare var jQuery:any;

@Component({
    templateUrl: './stock-market-chart-component.html',
    styleUrls: ['./stock-market-chart-component.scss']
})
export class StockMarketChartComponent implements OnInit {
    marksType: string;
    stockSymbol: string;
    selectedNavSymbol: string;

    @ViewChild('parent', {read: ViewContainerRef})
    parent: ViewContainerRef;

    constructor(private _route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver,
                @Inject(forwardRef(() => AppComponent)) public app: AppComponent) {}

    ngOnInit() {
        // const childComponent = this.componentFactoryResolver.resolveComponentFactory(TradingviewComponent);

        // setTimeout(() => {
        //     this.parent.createComponent(childComponent);
        //
        // }, 5000);
        const id = this._route.snapshot.params['id'];
        const marktype = this._route.snapshot.params['marktype'];
        //
        this.marksType = marktype;
        this.selectedNavSymbol = id;
    }

}
