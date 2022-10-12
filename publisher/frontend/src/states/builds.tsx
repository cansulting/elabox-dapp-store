import { BuildInfo, BuildList } from "../data/buildInfo";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import HiveConnect from "../hive/hiveConnect";
import { BUILDS_PATH, BUILD_INFO_PATH, EBOX_PACKAGE_EXT } from "../constants";

const DEFAULT_BUILDS = {
    1: {
        id: "test",
        number : 1,
        ipfsCID: "cid"
    }
}

export interface BuildState {
    status: string
    builds: {
        [key:string]: BuildList
    }
    initialize: () => Promise<void>
    getBuilds: (pkid: string) => BuildList
    deleteBuilds: (pkid: string) => Promise<void>
    uploadBuild?: (packageId: string, num: number, buf: Buffer, progress?: (percent:number) => void) => Promise<BuildInfo>
}

export const useBuildState = create<BuildState>() (
    devtools(
        persist( (set, get) => ({
            status: "unknown",
            builds: null,
            getBuilds: (pkid) => {
                return get().builds[pkid]
            },
            uploadBuild: async (packageId: string, num: number, buf: Buffer, progress?: (percent:number) => void) => {
                await get().initialize()
                let builds = get().builds
                // upload build
                console.log("uploading build")
                const cid = await HiveConnect.uploadBuffer(BUILDS_PATH + "/" + packageId + "/builds/"+ num + "." + EBOX_PACKAGE_EXT, buf, progress)
                // update build list definitions
                const buildinfo = { 
                    id: packageId + cid,
                    number: num,
                    ipfsCID: cid
                }
                const pkgbuild = builds[packageId]
                builds =  {...builds, [packageId]: {...pkgbuild, [num]: buildinfo}}
                // update builds definition
                await HiveConnect.uploadJson(BUILD_INFO_PATH, builds)
                set( states => ({...states, builds: builds }))
                return buildinfo
            },
            deleteBuilds: async (pkid: string) => {
                await HiveConnect.deletePath(pkid)
                const builds = {...get().builds}
                delete builds[pkid] 
                set( states => ({...states, builds: builds}))
                await HiveConnect.uploadJson(BUILD_INFO_PATH, builds)
            },
            initialize: async () => {
                if (get().builds)
                    return
                console.log("initializing builds")
                const builds = await HiveConnect.downloadJson(BUILD_INFO_PATH, DEFAULT_BUILDS)
                set( _ => ({builds: builds}))
            }
        }))
    )
)