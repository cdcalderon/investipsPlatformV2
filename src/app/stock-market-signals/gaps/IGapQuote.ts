export interface IGapQuote {
    time: number;
    close: number;
    low: number;
    high: number;
    open: number;
    dateStr: string;
    gapSize: number;
    previousClose: number;
    direction: string;
}