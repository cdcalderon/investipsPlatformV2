import {IGapSignal} from "./IGapSignals";
export interface ISignalsGapInfo {
    docs: IGapSignal[];
    limit: number;
    offset: number;
    total: number;

}
