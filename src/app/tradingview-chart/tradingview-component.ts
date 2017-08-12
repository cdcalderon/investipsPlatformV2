import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {StockChartSignalsService} from './stock-chart-signals-service';
import {IStockChartSignal} from './IStockChartSignal';
import {SelectItem} from 'primeng/primeng';
import {IGapQuote} from "../stock-market-signals/gaps/IGapQuote";
import {GapSignalsService} from "../stock-market-signals/gaps/gap-signals-service";
import * as moment from 'moment';
import { environment } from '../../environments/environment';


declare var TradingView: any;
declare var Datafeeds: any;

@Component({
    selector: 'app-tradingview',
    templateUrl: './tradingview-component.html',
    styleUrls: ['./tradingview-component.scss']
})
export class TradingviewComponent implements OnInit, AfterViewInit{

    signals: SelectItem[];

    selectedSignal: string;

    chartObject: any;

    @Input() symbol: string;
    @Input() marksType: string;
    errorMessage: string;
    gapSignals: IStockChartSignal;
    historicalGaps: IGapQuote[];
    stockChartSignalService: StockChartSignalsService;

    constructor(private _stockChartSignalService: StockChartSignalsService,
                private _gapSignalsService: GapSignalsService) {
        // this.signals = [];
        // this.signals.push({label:'Select Signal', value:null});
        // this.signals.push({label:'Gap 1', value:{id:1, name: 'New York', code: 'NY'}});
        // this.signals.push({label:'Gap 2', value:{id:2, name: 'Rome', code: 'RM'}});
        // this.signals.push({label:'Gap 3', value:{id:3, name: 'London', code: 'LDN'}});

        this.chartObject = {};
    }

    ngOnInit() {
       // this.renderTradingViewComponent();
       //  const from = '01/01/2016';
       //  const to = '01/01/2017';
       //  this._gapSignalsService.getHistoricalGaps(from, to, 'aapl')
       //      .subscribe(
       //          stockSignals => {
       //              this.historicalGaps = stockSignals;
       //
       //              this.signals = this.historicalGaps.map((g) => {
       //                  return {label: g.dateStr, value: g}
       //              });
       //              console.log(this.historicalGaps);
       //          },
       //          error => this.errorMessage = <any>error
       //      );
    }

    onSignalChanged(evt: any) {
        console.log(evt.value);
        const to = this.monthAdd(new Date(evt.value.signalDate * 1000), 6) / 1000;
        const from = this.monthAdd(new Date(evt.value.signalDate * 1000), -6) / 1000;

        this.chartObject.setVisibleRange({from: from, to: to});

        setTimeout(() => {
            this.setGapSignalStudy(this.chartObject, evt.value);
        },1000);

    }

    setChartObject(chart){
        this.chartObject = chart;
    }

    renderTradingViewComponent() {
       // TradingView.onready(function() {
        const stockChartSignalService = this._stockChartSignalService;
        const symbol = this.symbol;
        const monthAdd = this.monthAdd;
        const that = this;

        // const udf_datafeed = new Datafeeds.UDFCompatibleDatafeed('http://localhost:4000', null, this.marksType);
        const udf_datafeed = new Datafeeds.UDFCompatibleDatafeed(environment.stockMarketQuotesWithIndicatorsApiBaseUrl, null, this.marksType);

            const widget = new TradingView.widget({
                fullscreen: true,
                symbol: symbol,
                interval: 'D',
                toolbar_bg: '#f4f7f9',
                container_id: 'tv_chart_container',
                // BEWARE: no trailing slash is expected in feed URL
                datafeed: udf_datafeed,
                library_path: '../../assets/charting_library/',
                // Regression Trend-related functionality is not implemented yet, so it's hidden for a while
                drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
                disabled_features: ['save_chart_properties_to_local_storage', 'volume_force_overlay'],
                enabled_features: ['move_logo_to_main_pane', 'study_templates'],
                overrides: {
                    'volumePaneSize': 'tiny',
                    'paneProperties.background': '#222222',
                    'paneProperties.vertGridProperties.color': '#454545',
                    'paneProperties.horzGridProperties.color': '#454545',
                    'symbolWatermarkProperties.transparency': 90,
                    'scalesProperties.textColor' : '#AAA'
                },
                studies_overrides: {
                    'volume.volume.color.0': '#ff252d',
                    'volume.volume.color.1': '#36ff19',
                    'volume.volume.transparency': 70,
                    'volume.volume ma.color': '#f9fffd',
                    'volume.volume ma.transparency': 30,
                    'volume.volume ma.linewidth': 1,
                    'volume.show ma': true,
                    'bollinger bands.median.color': '#33FF88',
                    'bollinger bands.upper.linewidth': 7
                },
                debug: true,
                time_frames: [
                    { text: '50y', resolution: '6M' },
                    { text: '3y', resolution: 'W' },
                    { text: '8m', resolution: 'D' },
                    { text: '2m', resolution: 'D' },
                    { text: '1m', resolution: '60' },
                    { text: '1w', resolution: '30' },
                    { text: '7d', resolution: '30' },
                    { text: '5d', resolution: '10' },
                    { text: '3d', resolution: '10' },
                    { text: '2d', resolution: '5' },
                    { text: '1d', resolution: '5' }
                ],
                charts_storage_url: 'http://saveload.tradingview.com',
                charts_storage_api_version: '1.1',
                client_id: 'tradingview.com',
                user_id: 'public_user',
                favorites: {
                    intervals: ['1D', '3D', '3W', 'W', 'M'],
                    chartTypes: ['Area', 'Line']
                }
            });

        widget.onChartReady(function() {
            widget.chart().createStudy(
                'Stochastic',
                false,
                false,
                [14, 5, 5],
                null,
                {'%d.color' : '#E3FFCA', '%k.color' : '#00FF00'}
            );

            widget.chart().createStudy(
                'MACD',
                false,
                false,
                [8, 17, 'close', 9],
                null,
                {'macd.color' : '#00FF00', 'signal.color' : '#fffa00', 'histogram.color' : '#00F9FF'}
            );

            widget.chart().createStudy(
                'Moving Average',
                false,
                true, [
                    10
                ], function (guid) {
                    console.log(guid);
                },
                {'plot.color.0' : '#fffa00'}
            );


            that.setChartObject.bind(that)(widget.chart());
            // draw some simple technical analysis figures using drawings to show how it works


            const from = monthAdd(new Date(), -60).toString();
            const to = new Date();

            if(that.marksType === 'gaps') {
                stockChartSignalService.getGapSignals(from, to.toString(), symbol)
                    .subscribe(
                        stockSignals => {

                            //widget.chart().setVisibleRange({from: 1438128000, to: 1467763200});

                            that.signals = stockSignals.map((g) => {
                                return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
                            });

                            this.gapSignals = stockSignals;
                            for (const signal of this.gapSignals){
                                const signalDate = signal.signalDate;
                                const extensionDate = signal.drawExtensionDate;
                                const projection100 = signal.projection100;
                                let confirmationEntryPrice = 0;

                                if (signal.direction === 'up') {
                                    confirmationEntryPrice = signal.high;
                                } else if (signal.direction === 'down') {
                                    confirmationEntryPrice = signal.projection618;
                                }

                                // widget.chart().createShape({
                                //         time: signalDate,
                                //         price: confirmationEntryPrice},
                                //     {
                                //         shape: 'text',
                                //         zOrder: 'top',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         text: '       Entry: ' + confirmationEntryPrice,
                                //         overrides: {
                                //             color: '#00ff03',
                                //             fontsize: 12}
                                //     });
                                //
                                // widget.chart().createShape({
                                //         time: signalDate,
                                //         price: signal.projection100},
                                //     {
                                //         shape: 'text',
                                //         zOrder: 'top',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         text: '       Goal: ' + signal.projection100,
                                //         overrides: {
                                //             color: '#b3ff0b',
                                //             fontsize: 12}
                                //     });
                                //
                                // widget.chart().createShape({
                                //         time: signalDate,
                                //         price: signal.projection1618},
                                //     {
                                //         shape: 'text',
                                //         zOrder: 'top',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         text: '       Extended Goal: ' + signal.projection1618,
                                //         overrides: {
                                //             color: '#b3ff0b',
                                //             fontsize: 12}
                                //     });
                                // // widget.chart().createShape({
                                // //         time: signalDate,
                                // //         price: projection100},
                                // //     {
                                // //         shape: 'long_position',
                                // //         lock: true,
                                // //         disableSelection: true,
                                // //         disableSave: true,
                                // //         disableUndo: true,
                                // //         text: 'Signal Price Goal ' + this.gapSignals.goalPrice,
                                // //         overrides: {
                                // //             color: '#00ff03'}
                                // //     });
                                // widget.chart().createMultipointShape(
                                //     [
                                //         {time: signalDate, price: confirmationEntryPrice},
                                //         {time: extensionDate, price: confirmationEntryPrice}
                                //     ],
                                //     {
                                //         shape: 'trend_line',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         overrides: {
                                //             showLabel: true,
                                //             fontSize: 12,
                                //             linewidth: 1,
                                //             linecolor: '#01ff00'
                                //         }
                                //     }
                                // );
                                //
                                // widget.chart().createMultipointShape(
                                //     [
                                //         {time: signalDate, price: signal.projection100},
                                //         {time: extensionDate, price: signal.projection100}
                                //     ],
                                //     {
                                //         shape: 'trend_line',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         overrides: {
                                //             showLabel: true,
                                //             fontSize: 12,
                                //             linewidth: 1,
                                //             linecolor: '#aaff03'
                                //         }
                                //     }
                                // );
                                //
                                // widget.chart().createMultipointShape(
                                //     [
                                //         {time: signalDate, price: signal.projection1618},
                                //         {time: extensionDate, price: signal.projection1618}
                                //     ],
                                //     {
                                //         shape: 'trend_line',
                                //         lock: true,
                                //         disableSelection: true,
                                //         disableSave: true,
                                //         disableUndo: true,
                                //         overrides: {
                                //             showLabel: true,
                                //             fontSize: 12,
                                //             linewidth: 1,
                                //             linecolor: '#ffb500'
                                //         }
                                //     }
                                // );
                                //
                                // // widget.chart().createExecutionShape()  // ----------------------------------------------------
                                // //     .setText("@1,320.75 Limit Buy 1")
                                // //     .setTextColor("rgba(255,0,0,0.5)")
                                // //     .setArrowSpacing(25)
                                // //     .setArrowHeight(25)
                                // //     .setArrowColor("#F00")
                                // //     .setTime(signalDate)
                                // //     .setPrice(projection100);
                                //
                                // // const order = widget.chart().createOrderLine() /// ----------------------------------------
                                // //     .onMove(function() {
                                // //         console.log("Order moved event");
                                // //     })
                                // //     .onCancel(function(text) {
                                // //         console.log("Order cancel event");
                                // //     })
                                // //     .setText("STOP: 73.5 (5,64%)")
                                // //     .setLineLength(3)
                                // //     .setQuantity("2");
                                // // order.setPrice(projection100);
                                //
                                // // const position = widget.chart().createPositionLine() // --------------
                                // //     .onReverse(function(text) {
                                // //         console.log("Position reverse event");
                                // //     })
                                // //     .onClose(function(text) {
                                // //         console.log("Position close event");
                                // //     })
                                // //     .setText("PROFIT: 71.1 (3.31%)")
                                // //     .setQuantity("8.235")
                                // //     .setLineLength(1);
                                // // position.setPrice(projection100);
                                //
                                // // const position = widget.chart().createPositionLine() // -----------------------------------------------
                                // //     .onReverse(function(text) {
                                // //         console.log('Position reverse event');
                                // //     })
                                // //     .onClose(function(text) {
                                // //         console.log('Position close event');
                                // //     })
                                // //     .setText('PROFIT: 71.1 (3.31%)')
                                // //     .setQuantity('8.235')
                                // //     .setLineLength(3)
                                // // position.setPrice(projection100);
                            }

                        },
                        error => this.errorMessage = <any>error
                    );
            } else {
                stockChartSignalService.getThreeArrowSignals(from, to.toString(), symbol)
                    .subscribe(
                        stockSignals => {
                            that.signals = stockSignals.map((g) => {
                                return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
                            });
                        },
                        error => this.errorMessage = <any>error
                    );
            }




            // const position = widget.chart().createPositionLine() // -------------------------------------------------------------------
            //     .onReverse(function(text) {
            //         console.log('Position reverse event');
            //     })
            //     .onClose(function(text) {
            //         console.log('Position close event');
            //     })
            //     .setText('PROFIT: 71.1 (3.31%)')
            //     .setQuantity('8.235')
            //     .setLineLength(1);
            // position.setPrice(position.getPrice() - 2);



        }); // end of widget.onChartReady

        // }); // end of TradingView.onready
    }

    ngAfterViewInit() {
        // this.reloadPage();
        this.renderTradingViewComponent();
    }

    reloadPage() {
        window.location.reload();
    }

    setGapSignalStudy(chart: any, gap: IStockChartSignal){
        chart.removeAllShapes();
        chart.removeAllStudies();

        var shapes = chart.getAllShapes();

        for(let s of shapes) {
            chart.removeEntity(s.id);
        }


        chart.createShape({
                time: gap.signalDate,
                price: gap.confirmationEntryPrice},
            {
                shape: 'text',
                zOrder: 'top',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                text: `          Entry: ${gap.confirmationEntryPrice} - a: ${gap.a} - b: ${gap.b} -c: ${gap.c}`,
                overrides: {
                    color: '#00ff03',
                    fontsize: 12}
            });

        chart.createShape({
                time: gap.signalDate,
                price: gap.projection100},
            {
                shape: 'text',
                zOrder: 'top',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                text: '       Goal: ' + gap.projection100,
                overrides: {
                    color: '#b3ff0b',
                    fontsize: 12}
            });

        chart.createShape({
                time: gap.signalDate,
                price: gap.projection1618},
            {
                shape: 'text',
                zOrder: 'top',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                text: '       Extended Goal: ' + gap.projection1618,
                overrides: {
                    color: '#b3ff0b',
                    fontsize: 12}
            });
        // widget.chart().createShape({
        //         time: signalDate,
        //         price: projection100},
        //     {
        //         shape: 'long_position',
        //         lock: true,
        //         disableSelection: true,
        //         disableSave: true,
        //         disableUndo: true,
        //         text: 'Signal Price Goal ' + this.gapSignals.goalPrice,
        //         overrides: {
        //             color: '#00ff03'}
        //     });
        chart.createMultipointShape(
            [
                {time: gap.signalDate, price: gap.confirmationEntryPrice},
                {time: gap.drawExtensionDate, price: gap.confirmationEntryPrice}
            ],
            {
                shape: 'trend_line',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                overrides: {
                    showLabel: true,
                    fontSize: 12,
                    linewidth: 1,
                    linecolor: '#01ff00'
                }
            }
        );

        chart.createMultipointShape(
            [
                {time: gap.signalDate, price: gap.projection100},
                {time: gap.drawExtensionDate, price: gap.projection100}
            ],
            {
                shape: 'trend_line',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                overrides: {
                    showLabel: true,
                    fontSize: 12,
                    linewidth: 1,
                    linecolor: '#aaff03'
                }
            }
        );

        chart.createMultipointShape(
            [
                {time: gap.signalDate, price: gap.projection1618},
                {time: gap.drawExtensionDate, price: gap.projection1618}
            ],
            {
                shape: 'trend_line',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                overrides: {
                    showLabel: true,
                    fontSize: 12,
                    linewidth: 1,
                    linecolor: '#ffb500'
                }
            }
        );
    }

    monthAdd(date, month) {
        let temp = date;
        temp = new Date(date.getFullYear(), date.getMonth(), 1);
        temp.setMonth(temp.getMonth() + (month + 1));
        temp.setDate(temp.getDate() - 1);
        if (date.getDate() < temp.getDate()) {
            temp.setDate(date.getDate());
        }

        return temp;

    }
}
