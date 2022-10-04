import { ReleaseInfo } from "./releaseInfo"

export interface PackageInfo {
    id: string;
    name: string;
    desc: string;
    release?: ReleaseInfo;
}