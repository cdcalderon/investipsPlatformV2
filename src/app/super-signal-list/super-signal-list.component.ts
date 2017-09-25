import { Component, OnInit } from '@angular/core';
import { SuperSignalListService } from "./super-signal-list.service";

@Component({
  selector: 'app-super-signal-list',
  templateUrl: './super-signal-list.component.html',
  styleUrls: ['./super-signal-list.component.css']
})
export class SuperSignalListComponent implements OnInit {

  superSignals: any[];
  constructor(private superSignalListService: SuperSignalListService) { }

  ngOnInit() {
    this.superSignals = [
      {symbol: 'AAPL', signalType: 'gap', date: '05/07/2017'},
      {symbol: 'AMZN', signalType: 'stoch307', date: '11/08/2017'},
      {symbol: 'PNRA', signalType: 'threeArrows', date: '15/09/2017'},
    ];
  }

}
