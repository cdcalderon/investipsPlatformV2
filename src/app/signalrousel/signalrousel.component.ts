import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SignalrouselService} from "./signalrousel.service";
import {ISignalRousel} from "../common/signal/ISignalRousel";
import {Carousel} from "primeng/primeng";

declare var jQuery:any;

@Component({
  selector: 'app-signalrousel',
  templateUrl: './signalrousel.component.html',
  styleUrls: ['./signalrousel.component.css']
})
export class SignalrouselComponent implements OnInit {
  signals: ISignalRousel[] = [{symbol: 'PNRA', signalType: 'threeArrows', dateStr: '15/09/2017'}];
  errorMessage: string;
  @Input()signalType: string;
  @Input()autoplayInterval: string;
  @Input()easing:string;
  @Input()effectDuration:number;
  @ViewChild('carousel') car: Carousel;

  constructor(private signalrouselService:SignalrouselService) { }

  ngOnInit() {
    let from = this.monthAdd(new Date(), -10);
    let to =  this.monthAdd(new Date(), 0);
    if(this.signalType) {
      this.signalrouselService.getTopSignals(this.signalType, from, to, ['AAPL', 'AMZN', 'CSCO', 'PCLN'])
          .subscribe(topSignals => {
            this.signals = topSignals;
              },
          error => this.errorMessage = <any>error)
    } else {
      this.signals = [
        {symbol: 'AAPL', signalType: 'gap', dateStr: '05/07/2017'},
        {symbol: 'AMZN', signalType: 'stoch307', dateStr: '11/08/2017'},
        {symbol: 'PNRA', signalType: 'threeArrows', dateStr: '15/09/2017'},
      ];
    }

  }

  monthAdd(date: Date, month: number): number {
    let temp;
    temp = new Date(date.getFullYear(), date.getMonth(), 1);
    temp.setMonth(temp.getMonth() + (month + 1));
    temp.setDate(temp.getDate() - 1);
    if (date.getDate() < temp.getDate()) {
      temp.setDate(date.getDate());
    }

    return temp / 1000;

  }

}
