import {PackageInfo } from "./packageInfo"

export interface StoreInfo {
    id: string;
    desc: string;
    name: string;
    iconcid: string;
    packages?: { [key:string]: PackageInfo };
}


export function updatePackage(info: StoreInfo, pkg: PackageInfo): void {
    //info.packages = {}
    if (!info.packages)
        info.packages = {}
    info.packages[pkg.id] = pkg
    //console.log("(((((((((((((((222222)))))))))))))))",info)
}