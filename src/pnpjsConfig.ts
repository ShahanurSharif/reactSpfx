import {spfi, SPFI, SPFx} from "@pnp/sp"
import {WebPartContext} from "@microsoft/sp-webpart-base";
import {LogLevel, PnPLogging} from "@pnp/logging";

var _sp: SPFI = undefined; 

export const getSP = (context?: WebPartContext): SPFI | null => {
    if (context!=null) {
        _sp = spfi()
            .using(SPFx(context))
            .using(PnPLogging(LogLevel.Warning))
    }
    return _sp;
}