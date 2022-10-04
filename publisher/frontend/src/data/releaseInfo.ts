import {BuildInfo} from "./buildInfo"

export interface ReleaseInfo {
    desc: string;
    build: BuildInfo;
    dateEpoch?: number;
    type?:number;
    version:string;
}