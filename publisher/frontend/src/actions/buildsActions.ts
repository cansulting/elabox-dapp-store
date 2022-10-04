import { BUILDS_PATH, BUILD_INFO_PATH, EBOX_PACKAGE_EXT } from "../constants";
import HiveConnect from "../hive/hiveConnect";
import { BuildInfo } from "../data/buildInfo";

let BUILDS : [BuildInfo]

// use to upload build file and update definitions
export async function uploadBuild(packageId: string, num: number, buf: Buffer) : Promise<BuildInfo> {
    const builds = await retrieveBuildList()
    // upload build
    const cid = await HiveConnect.uploadBuffer(BUILDS_PATH + "/" + num + "." + EBOX_PACKAGE_EXT, buf)
    // update build list definitions
    const buildinfo = { 
        id: packageId + cid,
        number: num,
        ipfsCID: cid
    }
    builds.push(buildinfo)
    await HiveConnect.uploadJson(BUILD_INFO_PATH, builds)
    BUILDS = builds
    return buildinfo
}

export function removeBuild(id: string) {

}

export async function retrieveBuildList() : Promise<[BuildInfo]> {
    if (BUILDS) 
        return BUILDS
    BUILDS = await HiveConnect.downloadJson(BUILD_INFO_PATH, {})
    return BUILDS
}