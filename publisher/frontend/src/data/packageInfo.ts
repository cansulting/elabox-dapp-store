import { ReleaseInfo } from "./releaseInfo"

export interface PackageInfo {
    id: string;
    name: string;
    desc: string;
    iconcid:string;
    release?: ReleaseInfo;
}