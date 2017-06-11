import {Component, OnInit, AfterViewInit, Input} from '@angular/core';

declare var TradingView: any;
declare var Datafeeds: any;

@Component({
    selector: 'app-tradingview',
    templateUrl: './tradingview-component.html',
    styleUrls: ['./tradingview-component.scss']
})
export class TradingviewComponent implements OnInit, AfterViewInit{
    @Input() symbol: string;
    @Input() marksType: string;
    constructor() {}

    ngOnInit() {
        this.renderTradingViewComponent();
    }

    renderTradingViewComponent() {
       // TradingView.onready(function() {

        var udf_datafeed = new Datafeeds.UDFCompatibleDatafeed('http://localhost:4000', null, this.marksType);


            const widget = new TradingView.widget({
                fullscreen: true,
                symbol: this.symbol,
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

            // draw some simple technical analysis figures using drawings to show how it works

            widget.chart().createShape({time: 1468209600, price: 120},
                //  widget.chart().createShape({time: Math.floor((fourMonthAgo + today) / 2), price: maxPrice},
                {
                    shape: 'triangleup',
                    lock: true,
                    disableSelection: true,
                    disableSave: true,
                    disableUndo: true,
                    text: '3 month high at ' + 120,
                    overrides: { color: '#FF0000' }
                });

        }); // end of widget.onChartReady

        //
        // }); // end of TradingView.onready

    }

    ngAfterViewInit() {
        // this.reloadPage();
       // this.renderTradingViewComponent();
    }

    reloadPage() {
        window.location.reload();
    }


}
