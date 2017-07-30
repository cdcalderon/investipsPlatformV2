export interface IFilterCriteria {
    symbols: string[];
    exchanges: string[];
    caps: string[];
    from: Date;
    to: Date;
    lowPriceRange: number;
    highPriceRange: number;
}