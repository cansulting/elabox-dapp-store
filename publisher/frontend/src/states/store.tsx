import { HIVE_CONFIG, STORE_INFO_PATH } from "../constants";
import Auth from "../hive/auth";
import HiveConnect from "../hive/hiveConnect";
import create from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { StoreInfo } from "../data/storeInfo";
import { PackageInfo } from "../data/packageInfo";
import { updateStoreDefinition } from "../api/storehubActions";
import { ReleaseUnit } from "../data/releaseInfo"; 

export const SIGNEDIN = "signedin"
export const SIGNEDOUT = "signedout"
export const SIGNING = "signing"

const DEFAULT_STORE: any = {
    id: "web3.store",
    desc: "this is a sample store",
    name: "new store",
    packages: {},
}

const DEFAULT_PKG: PackageInfo = {
    id: "company.sample",
    name: "sample package",
    desc: "this is description",
    iconcid: "icon link here"
}

interface StoreState {
    authStatus: string
    info?: StoreInfo | null
    selectedPkg?: PackageInfo 
    selectedTab: number
    setSelectedPackage: (pkg: string) => void
    setSelectedTab: (index: number) => void
    setStoreInfo: (info: StoreInfo) => void
    setAuthStatus: (status: string) => void
    updatePackage: (pkg: PackageInfo) => void
    updatePackageRelease: (pkid: string, releaseType: string, release: ReleaseUnit) => void
    initialize: () => Promise<boolean>              // initialize copy of store info
    hiveUpdate: () => Promise<void>               // save changes to hive
}

export const useStoreState = create<StoreState>()(
    devtools(
        persist(
            (_set, get) => ({
                authStatus: SIGNEDOUT,
                selectedTab: -1,
                info: null,
                setAuthStatus: (status) => _set((_) => ({authStatus: status})),
                setStoreInfo: (_info) => _set((_) => {
                    // if no packages yet, create an empty one
                    if (!_info.packages || 
                        Object.values(_info.packages).length === 0) {
                        const pkgid = DEFAULT_PKG.id
                        _info.packages = {}
                        _info.packages[pkgid] = DEFAULT_PKG
                    } 
                    const pkgs = Object.values(_info.packages)
                    let pkg = pkgs[0]
                    return ({info: _info, selectedPkg: pkg, selectedTab: 0})
                }),
                setSelectedTab: (index) => _set((_) => ({selectedTab: index})),
                setSelectedPackage: (pkg) => _set( (states) => { 
                    if (pkg && pkg.length > 0)
                        return ({selectedPkg:states.info.packages[pkg]})
                    return {}
                }),
                // use to update specific package data
                updatePackage: (pkg : PackageInfo) => {
                    _set( (states:any) => {
                        const info = states.info
                        const packages = {...info.packages}
                        packages[pkg.id] = pkg
                        return { 
                            info: {...info, packages : packages}, 
                            selectedPackage: pkg,
                        }
                    })
                },
                // update current package release
                updatePackageRelease: (pkid: string, releaseType: string, release: ReleaseUnit) => {
                    const store = get().info
                    if (! store.packages || !store.packages[pkid])
                        throw "package " + pkid + " not found"
                    release.dateEpoch = Math.floor(Date.now() / 1000)
                    const pkgs = store.packages
                    pkgs[pkid].release = { ...pkgs[pkid].release, [releaseType]: release}
                    _set( _ => ({
                        info: {...store, packages: pkgs}
                    }))
                },

                // initialize the Hive and load store info
                initialize: () => {
                    return Auth.isConnected(HIVE_CONFIG.appId).then( async _con => {
                        let _status = _con ? SIGNEDIN : SIGNEDOUT
                        const status = get().authStatus
                        // after being connected, initilize hive
                        //if (_con && !get().info) {
                            await HiveConnect.initialize(HIVE_CONFIG)
                            const store = await HiveConnect.downloadJson(STORE_INFO_PATH, DEFAULT_STORE)
                            console.log("STORE DEFINITION LOADED", store)
                            get().setStoreInfo( store)
                        //}
                        if (status !== _status) {
                            get().setAuthStatus(_status)
                        }
                    }) as Promise<boolean>
                },
                // update store info and store definition on hive and store hub
                hiveUpdate : async () => {
                    const store = get().info
                    const cid = await HiveConnect.uploadJson(STORE_INFO_PATH, store)
                    updateStoreDefinition({
                        id: store.id, 
                        desc: store.desc,
                        name: store.name,
                        storecid: cid
                    })
                }
            }), {
                name: "store-storage"
            }
        )
    )
)