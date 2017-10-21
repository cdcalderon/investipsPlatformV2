import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {StockChartSignalsService} from './stock-chart-signals-service';
import {IStockChartSignal} from './IStockChartSignal';
import {SelectItem} from 'primeng/primeng';
import {IGapQuote} from "../stock-market-signals/gaps/IGapQuote";
import {GapSignalsService} from "../stock-market-signals/gaps/gap-signals-service";
import {WidgetShape} from './WidgetShape'
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import {PaidMemberChartStudiesService} from "./paid-member-chart-studies-service";
import {SecurityWidgetDefinition} from "./SecurityWidgetDefinition";

declare var TradingView: any;
declare var Datafeeds: any;

@Component({
    selector: 'app-tradingview',
    templateUrl: './tradingview-component.html',
    styleUrls: ['./tradingview-component.scss']
})

export class TradingviewComponent implements OnInit, AfterViewInit{

    private _investipsDotnetApiUrlBase = environment.investipsDotnetApi;

    signals: SelectItem[];
    selectedSignal: string;
    chartObject: any;
    @Input() symbol: string;
    @Input() marksType: string;
    @Input() hostComponent: string;
    errorMessage: string;
    gapSignals: IStockChartSignal;
    memberStudies: SecurityWidgetDefinition;

    constructor(private _stockChartSignalService: StockChartSignalsService,
                private _gapSignalsService: GapSignalsService,
                private _paidMemberChartStudiesService: PaidMemberChartStudiesService) {
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
        let chartWidgetOptions: any;
       // TradingView.onready(function() {
        const symbol = this.symbol;

        // const udf_datafeed = new Datafeeds.UDFCompatibleDatafeed('http://localhost:4000', null, this.marksType);
        const udf_datafeed = new Datafeeds.UDFCompatibleDatafeed(environment.stockMarketQuotesWithIndicatorsApiBaseUrl, null, this.marksType);

       // const udf_datafeed2 = new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com', null, this.marksType);

        if(this.hostComponent === 'dashboard') {
            chartWidgetOptions = this.getChartDashboardOptions(symbol, udf_datafeed);
        } else {
            chartWidgetOptions = this.getChartSignalOptions(symbol, udf_datafeed);
        }



            const widget = new TradingView.widget(chartWidgetOptions);

        this.onWidgetReady(this, widget, this._stockChartSignalService);
        // }); // end of TradingView.onready
    }

    ngAfterViewInit() {
        this.renderTradingViewComponent();
    }

    setGapSignalStudy(chart: any, gap: IStockChartSignal){
        //chart.removeAllShapes();
        chart.removeAllStudies();

        var shapes = chart.getAllShapes();

        for(let s of shapes) {
            chart.removeEntity(s.id);
        }

        this.createWidgetShape({chart: chart, time:gap.signalDate, price: gap.confirmationEntryPrice,
            text:`          Entry: ${gap.confirmationEntryPrice} - a: ${gap.a} - b: ${gap.b} -c: ${gap.c}`,
            color:'#00ff03'});

        // this.createWidgetShape({chart: chart, time:gap.signalDate, price: gap.projection100,
        //     text:'       Goal: ' + gap.projection100,
        //     color:'#b3ff0b'});
        //
        // this.createWidgetShape({chart: chart, time:gap.signalDate, price: gap.projection1618,
        //     text: '       Extended Goal: ' + gap.projection1618,
        //     color: '#b3ff0b'});
        //
        // this.createHorizontalLine({chart: chart,
        //     time: gap.signalDate, price: gap.confirmationEntryPrice,
        //     extendedTime: gap.drawExtensionDate, confirmationEntryPrice: gap.confirmationEntryPrice,
        //     color: '#01ff00'});
        //
        // this.createHorizontalLine({chart: chart,
        //     time: gap.signalDate, price: gap.projection100,
        //     extendedTime: gap.drawExtensionDate, confirmationEntryPrice: gap.projection100,
        //     color: '#aaff03'});
        //
        // this.createHorizontalLine({chart: chart,
        //     time: gap.signalDate, price: gap.projection1618,
        //     extendedTime: gap.drawExtensionDate, confirmationEntryPrice: gap.projection1618,
        //     color: '#ffb500'});

        this.createFibExtension({chart: chart, time:gap.signalDate, aPivot: gap.a, bPivot: gap.b,
        cPivot:gap.c, extendedTime: gap.drawExtensionDate, price: gap.projection1618, color: '#ffb500'})



        // chart.createShape({
        //         time: gap.signalDate,
        //         price: gap.projection1618
        //     },
        //     {
        //         shape: 'fib_retracement',
        //         extendLeft: true,
        //         extendRight: true,
        //         zOrder: 'top',
        //         lock: true,
        //         disableSelection: true,
        //         disableSave: true,
        //         disableUndo: true,
        //         text: '',
        //         overrides: {
        //             color: '#ffb500',
        //             fontsize: 12}
        //     });

    }

    getPaidMemberStudies() {
        let chart = this.chartObject;
        this._paidMemberChartStudiesService.getMemberStudies(1)
            .subscribe(
                memberStudies => {
                    this.memberStudies = memberStudies;

                    //center study on screen
                    let widgetDate = this.memberStudies.widgetShapes[0].shapePoints[0].time;

                    const from = this.monthAdd(new Date(widgetDate * 1000), -6) / 1000;
                    const to = this.monthAdd(new Date(widgetDate * 1000), 6) / 1000;

                    chart.setVisibleRange({from: from, to: to});

                    setTimeout(() => {
                        this.renderPaidMemberStudies(chart, this.memberStudies);
                    },1000);

                }
            ,
                error => this.errorMessage = <any>error
            );
    }

    renderPaidMemberStudies(chart: any, studies: SecurityWidgetDefinition){

        this.chartObject.removeAllShapes();
        this.chartObject.removeAllStudies();

        let widgetShape: WidgetShape = {
            chart: chart,
            time: studies.widgetShapes[0].shapePoints[0].time,
            extendedTime: studies.widgetShapes[0].shapePoints[2].time,
            aPivot: studies.widgetShapes[0].shapePoints[0].price,
            bPivot: studies.widgetShapes[0].shapePoints[1].price,
            cPivot: studies.widgetShapes[0].shapePoints[2].price,
        };


        this.createFibExtension(widgetShape)
    }



    onWidgetReady(tradingviewComponent, widget, stockChartSignalService) {
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

            tradingviewComponent.setChartObject.bind(tradingviewComponent)(widget.chart());

            const from = tradingviewComponent.monthAdd(new Date(), -60).toString();
            const to = new Date();

            if(tradingviewComponent.marksType === 'gap') {
                stockChartSignalService.getGapSignalsWithFibProjections(from, to.toString(), tradingviewComponent.symbol)
                    .subscribe(
                        stockSignals => {
                            tradingviewComponent.signals = stockSignals.map((g) => {
                                return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
                            });

                            this.gapSignals = stockSignals;
                            for (const signal of this.gapSignals){
                                let confirmationEntryPrice = 0;

                                if (signal.direction === 'up') {
                                    confirmationEntryPrice = signal.high;
                                } else if (signal.direction === 'down') {
                                    confirmationEntryPrice = signal.projection618;
                                }
                            }

                        },
                        error => this.errorMessage = <any>error
                    );
            } else {
                stockChartSignalService.getThreeArrowSignalsWithFibProjections(from, to.toString(), tradingviewComponent.symbol)
                    .subscribe(
                        stockSignals => {
                            tradingviewComponent.signals = stockSignals.map((g) => {
                                return {label: moment(new Date(g.signalDate * 1000)).format('ll'), value: g}
                            });
                        },
                        error => this.errorMessage = <any>error
                    );
            }
            //tradingviewComponent.getPaidMemberStudies();

        }); // end of widget.onChartReady
    }

    createWidgetShape(widgetShape: WidgetShape) {
        widgetShape.chart.createShape({
                time: widgetShape.time,
                price: widgetShape.price
            },
            {
                shape: 'text',
                zOrder: 'top',
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                text: widgetShape.text,
                overrides: {
                    color: widgetShape.color,
                    fontsize: 12}
            });
    }

    createHorizontalLine(widgetShape: WidgetShape) {
        widgetShape.chart.createMultipointShape(
            [
                {time: widgetShape.time, price: widgetShape.price},
                {time: widgetShape.extendedTime, price: widgetShape.confirmationEntryPrice}
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
                    linecolor: widgetShape.color
                }
            }
        );
    }
    createFibExtension(widgetShape: WidgetShape) {
        widgetShape.chart.createMultipointShape(

            [
                {time: widgetShape.time, price: widgetShape.aPivot},
                {time: widgetShape.time, price: widgetShape.bPivot},
                {time: widgetShape.extendedTime, price: widgetShape.cPivot}
            ],
            {
                overrides: {
                    extendLines: true,
                    fillBackground: false,
                    showCoeffs: false,
                    "level1.color":'#ff04a1',
                    'trendline.visible': false,
                    'level10.visible': false,
                    'level9.visible': false,
                    'level11.visible': false,
                    'level1.visible': false,
                    'level2.visible': false

                },
                shape: 'fib_trend_ext',
                lock: false,

              //  disableSelection: true,
               // disableSave: true,
              //  disableUndo: true,

              //
            }
        );
    }

    getChartSignalOptions(symbol: string, udf_datafeed: string) {
        let options = {
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
            //charts_storage_url: 'http://saveload.tradingview.com',
            //charts_storage_url: 'http://localhost:5000',
            charts_storage_url: this._investipsDotnetApiUrlBase,
            charts_storage_api_version: 'api',
            //charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_user',
            favorites: {
                intervals: ['1D', '3D', '3W', 'W', 'M'],
                chartTypes: ['Area', 'Line']
            }
        };

        return options;
    }

    getChartDashboardOptions(symbol: string, udf_datafeed: string) {
        let options = {
            fullscreen: true,
            autosize: true,
            height: 650,
            symbol: symbol,
            interval: 'D',
            toolbar_bg: '#f4f7f9',
            container_id: 'tv_chart_container',
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: udf_datafeed,
            library_path: '../../assets/charting_library/',
            // Regression Trend-related functionality is not implemented yet, so it's hidden for a while
            drawings_access: { type: 'black', tools: [ { name: 'Regression Trend' } ] },
           // disabled_features: ['save_chart_properties_to_local_storage', 'volume_force_overlay'],
           // enabled_features: ['move_logo_to_main_pane', 'study_templates'],
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
            //debug: true,
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
            //charts_storage_url: 'http://saveload.tradingview.com',
            // charts_storage_url: 'http://localhost:5000',
            // charts_storage_api_version: 'api',
            // //charts_storage_api_version: '1.1',
            // client_id: 'tradingview.com',
            // user_id: 'public_user',
            // favorites: {
            //     intervals: ['1D', '3D', '3W', 'W', 'M'],
            //     chartTypes: ['Area', 'Line']
            // }
        }
        return options;
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
