import axios from "axios";
import { STORE_HUB_URL } from "../hive/config";
import { StoreDefinition } from "../data/storeDefinition";

export async function updateStoreDefinition(def: StoreDefinition) {
    const res = await axios.post(STORE_HUB_URL + "/api/v1/update", JSON.stringify(def))
    console.log(res.data)
}