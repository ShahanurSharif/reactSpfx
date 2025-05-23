import {spfi, SPFI, SPFx} from "@pnp/sp"
import {WebPartContext} from "@microsoft/sp-webpart-base";
import {LogLevel, PnPLogging} from "@pnp/logging";

let _sp: SPFI | undefined = undefined;

export const getSP = (context: WebPartContext): SPFI => {
    if (_sp === undefined && context !== undefined) {
        _sp = spfi()
            .using(SPFx(context))
            .using(
                PnPLogging(LogLevel.Warning)
            )
    }
    return _sp!;
}