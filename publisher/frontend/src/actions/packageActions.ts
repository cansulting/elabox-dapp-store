
import { PackageInfo } from "../data/packageInfo"
import * as storeInfo from "../data/storeInfo"
import { getStoreInstance, updateStoreInfo } from "./storeInfoActions"

export async function updatePackage(pkg: PackageInfo) {
    storeInfo.updatePackage( await getStoreInstance(), pkg)
    console.log("!!!!",await getStoreInstance())
    await updateStoreInfo()
}

export async function removePackage(pkgId: string) {
    //storeInfo.updatePackage( await getStoreInstance(), pkg)
}