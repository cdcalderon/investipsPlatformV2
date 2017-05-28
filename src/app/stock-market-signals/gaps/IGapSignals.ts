export interface IGapSignal {
    _id: string;
    symbol: string;
    volume: number;
    close: number;
    low: number;
    high: number;
    open: number;
    dateStr: string;
    gapSize: number;
    previousClose: number;
    direction: string;
}
