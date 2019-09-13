import { Response } from "express";
import { Switch } from "../../utils/switch/Switch";
import { log } from "../../utils/debugging/log";
import { useIndexHTMLFile } from "../middleware/useIndexHTMLFile";
import { niceInterfaceForRestGuruRootURL } from "./niceInterfaceForRestGuruRootURL";
import { jsonString } from "../../utils/strings/jsonString";

const restGuruRootResourceJSONRepresentation = { title: "restguru root resource "}

export const restGuruGetRoutesForHeader = 
    (res: Response) =>
    (header: string) => 
    Switch
        .when(log(header))
        .matchesLazy(h => h.includes("text/plain"), () => res.send("here is some plain text"))
        .matchesLazy(h => h.includes("text/html"), () => useIndexHTMLFile(res))
        .matchesLazy(h => h.includes(niceInterfaceForRestGuruRootURL), () => res.send(jsonString(restGuruRootResourceJSONRepresentation)))
        .otherwise(() => res.sendStatus(406))
        .result