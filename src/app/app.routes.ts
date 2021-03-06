import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
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
import {StockMarketChartComponent} from './stock-market-chart/stock-market-chart-component';
import {GapSignalsComponent} from './stock-market-signals/gaps/gap-signals-component';
import {ThreeArrowsComponent} from "./stock-market-signals/three-arrows/three-arrows-signals-component";
import {Stoch307SignalsComponent} from "./stock-market-signals/stoch-307/stoch307-signals-component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CallbackComponent} from "./callback/callback.component";
import {PortfolioComponent} from './portfolio/portfolio.component';

export const routes: Routes = [
   // {path: '', component: DashboardDemo},
    {path: '', component: DashboardComponent},
    {path: 'callback', component: CallbackComponent },
    {path: 'gapsignals', component: GapSignalsComponent},
    {path: 'portfolios', component: PortfolioComponent},
    {path: 'threearrows', component: ThreeArrowsComponent},
    {path: 'stoch307', component: Stoch307SignalsComponent},
    {path: 'marketchart/:id/:marktype', component: StockMarketChartComponent},
    {path: 'sample', component: SampleDemo},
    {path: 'forms', component: FormsDemo},
    {path: 'data', component: DataDemo},
    {path: 'panels', component: PanelsDemo},
    {path: 'overlays', component: OverlaysDemo},
    {path: 'menus', component: MenusDemo},
    {path: 'messages', component: MessagesDemo},
    {path: 'misc', component: MiscDemo},
    {path: 'empty', component: EmptyDemo},
    {path: 'charts', component: ChartsDemo},
    {path: 'file', component: FileDemo},
    {path: 'utils', component: UtilsDemo},
    {path: 'documentation', component: Documentation},
    {path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
