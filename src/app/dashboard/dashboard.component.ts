import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  marksType: string;
  selectedNavSymbol: string;
  hostComponent: string = 'dashboard';
  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

  ngOnInit() {

    this.marksType = 'gap';
    this.selectedNavSymbol = 'AAPL';
  }

}
