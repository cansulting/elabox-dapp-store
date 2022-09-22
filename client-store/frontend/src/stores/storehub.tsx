import create from "zustand"
import {getStoreList} from "../api/storehub"
import {StoreHubState} from "../interfaces/stores/storeHub"
export const useStoreHubStore=create<StoreHubState>((set) =>({
    list: [],
    fetchStores: async () => {
        try {
            const list = await getStoreList()
            set((state:StoreHubState) => ({...state, list}))            
        } catch (error) {
            
        }
    },
}))

export default useStoreHubStore