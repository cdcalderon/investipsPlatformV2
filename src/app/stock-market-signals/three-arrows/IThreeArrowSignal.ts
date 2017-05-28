export interface IThreeArrowSignal {
    _id: string;
    symbol: string;
    isRedArrow: boolean;
    isGreenArrow: boolean;
    macdHistogram: number;
    stochasticsD: number;
    stochasticsK: number;
    movingAvg30: number;
    movingAvg10: number;
    volume: number;
    close: number;
    low: number;
    high: number;
    open: number;
    dateStr: string;
}
