import { ReleaseInfo } from "../data/releaseInfo";
import { getStoreInstance, updateStoreInfo } from "./storeInfoActions";

// use to update package release
export async function updatePackageRelease(packageId: string, release: ReleaseInfo) {
    // const store = await getStoreInstance()
    // if (! store.packages || !store.packages[packageId])
    //     throw "package " + packageId + " not found"
    // release.dateEpoch = Math.floor(Date.now() / 1000)
    // store.packages[packageId].release = release
    // await updateStoreInfo()
}