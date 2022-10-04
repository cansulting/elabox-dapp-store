import { STORE_INFO_PATH } from "../constants";
import HiveConnect from "../hive/hiveConnect";
import { StoreInfo } from "../data/storeInfo";
import { updateStoreDefinition } from "./storehubActions";

const DEFAULT_STORE: any = {
    id: "web3.store",
    desc: "this is a sample store",
    name: "new store",
    packages: {}
}
let STORE_INSTANCE : StoreInfo

export async function getStoreInstance() : Promise<StoreInfo>{
    if (STORE_INSTANCE) {
        return STORE_INSTANCE
    }
    STORE_INSTANCE = await HiveConnect.downloadJson(STORE_INFO_PATH, DEFAULT_STORE) 
    return STORE_INSTANCE
}

// update store info
export async function updateStoreInfo() {
    const store = await getStoreInstance()
    const strStore = JSON.stringify(store)
    console.log("updating store info", strStore)
    const cid = await HiveConnect.uploadBuffer(STORE_INFO_PATH, Buffer.from(strStore))
    console.log("uploaded " + STORE_INFO_PATH, "CID", cid)
    // update storehub cid
    await updateStoreDefinition({
        id: store.id, 
        desc: store.desc,
        name: store.name,
        storecid: cid
    })
}
