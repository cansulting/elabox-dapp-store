import {BuildInfo} from "./buildInfo"

export enum eRelease {
    alpha,
    beta,
    prod
}

export interface ReleaseUnit {
    desc: string;
    build: BuildInfo;
    dateEpoch?: number;
    type?:number;
    version:string;
}

export interface ReleaseInfo {
    alpha?: ReleaseUnit
    beta?: ReleaseUnit
    prod?: ReleaseUnit
}