import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import 'rxjs/add/operator/toPromise';

import {AccordionModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CarouselModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {EditorModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {GalleriaModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {MegaMenuModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {SlideMenuModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {TerminalModule} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {TreeTableModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenu } from './app.menu.component';
import {AppTopBar} from './app.topbar.component';
import {AppFooter} from './app.footer.component';
import {InlineProfileComponent} from './app.profile.component';
import {DashboardDemo} from './demo/view/dashboarddemo';
import {SampleDemo} from './demo/view/sampledemo';
import {FormsDemo} from './demo/view/formsdemo';
import {DataDemo} from './demo/view/datademo';
import {PanelsDemo} from './demo/view/panelsdemo';
import {OverlaysDemo} from './demo/view/overlaysdemo';
import {MenusDemo} from './demo/view/menusdemo';
import {MessagesDemo} from './demo/view/messagesdemo';
import {MiscDemo} from './demo/view/miscdemo';
import {EmptyDemo} from './demo/view/emptydemo';
import {ChartsDemo} from './demo/view/chartsdemo';
import {FileDemo} from './demo/view/filedemo';
import {UtilsDemo} from './demo/view/utilsdemo';
import {Documentation} from './demo/view/documentation';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';

import {StockMarketChartComponent} from './stock-market-chart/stock-market-chart-component';
import {GapSignalsComponent} from './stock-market-signals/gaps/gap-signals-component';
import {GapSignalsService} from './stock-market-signals/gaps/gap-signals-service';
import {ThreeArrowsComponent} from './stock-market-signals/three-arrows/three-arrows-signals-component';
import {ThreeArrowsService} from './stock-market-signals/three-arrows/three-arrows-signals-service';
import {StockSymbolService} from './common/stock-symbols-service';

import {TradingviewComponent} from './tradingview-chart/tradingview-component';
import {StockChartSignalsService} from './tradingview-chart/stock-chart-signals-service';
import {SignalFilterComponent} from './signal-filter/signal-filter-component';
import {Stoch307SignalsComponent} from './stock-market-signals/stoch-307/stoch307-signals-component';
import {Stoch307SignalsService} from './stock-market-signals/stoch-307/stoch307-signals-service';
import {PaidMemberChartStudiesService} from './tradingview-chart/paid-member-chart-studies-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { SuperSignalListComponent } from './super-signal-list/super-signal-list.component';
import { SuperSignalListService } from './super-signal-list/super-signal-list.service';
import { SignalrouselComponent } from './signalrousel/signalrousel.component';
import { SignalrouselService } from './signalrousel/signalrousel.service';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        SharedModule,
        ContextMenuModule,
        DataGridModule,
        DataListModule,
        DataScrollerModule,
        DataTableModule,
        DialogModule,
        DragDropModule,
        DropdownModule,
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        GMapModule,
        GrowlModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        ScheduleModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
        SplitButtonModule,
        StepsModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule

    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        DashboardDemo,
        SampleDemo,
        FormsDemo,
        DataDemo,
        PanelsDemo,
        OverlaysDemo,
        MenusDemo,
        MessagesDemo,
        MessagesDemo,
        MiscDemo,
        ChartsDemo,
        EmptyDemo,
        FileDemo,
        UtilsDemo,
        Documentation,
        StockMarketChartComponent,
        GapSignalsComponent,
        ThreeArrowsComponent,
        TradingviewComponent,
        SignalFilterComponent,
        Stoch307SignalsComponent,
        DashboardComponent,
        SuperSignalListComponent,
        SignalrouselComponent,
        CallbackComponent,
        PortfolioComponent,

    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy},
            CarService,
            CountryService,
            EventService,
            NodeService,
            GapSignalsService,
            ThreeArrowsService,
            StockChartSignalsService,
            StockSymbolService,
            Stoch307SignalsService,
            PaidMemberChartStudiesService,
            SuperSignalListService,
            DashboardService,
            SignalrouselService,
            AuthService
    ],
    bootstrap:[AppComponent]
})
export class AppModule { }
