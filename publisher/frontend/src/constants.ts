import { HiveConfig } from "./hive/hiveConfig"

enum BUILD_TYPE {
    "DEBUG" = "DEBUG",
    "RELEASE" = "RELEASE",
    "STAGING" = "STAGING"
}

const DevConfig : HiveConfig = {
    //userDid: "did:elastos:iVY4fw5TojCj11ArKsNfKsYJDgiddWo5Tn",
    resolverUrl: "testnet",
    providerAddress: "https://hive-testnet1.trinity-tech.io",
    appId: "did:elastos:imMY7uHc5WCDUhWCVaH5MtFFCBMegCaEYH"
} 

export const STORE_HUB_URL = "http://192.168.118.25:4005"
export const BUILD = BUILD_TYPE.DEBUG
export const HIVE_CONFIG =  
    BUILD === "RELEASE" as BUILD_TYPE ? DevConfig : 
        (BUILD === BUILD_TYPE.DEBUG ? DevConfig : DevConfig)

export const STORE_PATH = "store"
export const BUILDS_PATH = STORE_PATH + "/" + "builds"
export const EBOX_PACKAGE_EXT = "box"
export const STORE_INFO_PATH = STORE_PATH + "/info.json"
export const BUILD_INFO_PATH = STORE_PATH + "/builds.json"

export function retrieveIconPath(packageId:string): string {
    return STORE_PATH + "/" + packageId + "/icon"
}