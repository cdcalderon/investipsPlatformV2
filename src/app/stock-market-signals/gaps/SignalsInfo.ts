import {IGapSignal} from "./IGapSignals";
export interface SignalsInfo {
    docs: IGapSignal[];
    limit: number;
    offset: number;
    total: number;

}
