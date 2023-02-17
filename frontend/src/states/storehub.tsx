import { StoreProps } from "src/components/Store"
import create from "zustand"
import {getStoreList} from "../api/storehub"

export interface StoreHubState {
    list : StoreProps[]
    fetchStores: () => Promise<any>
}

export const useStoreHubStore=create<StoreHubState>((set) =>({
    list: [],
    fetchStores: async () => {
        try {
            const { stores } = await getStoreList()
            set((state:StoreHubState) => ({...state, list:stores}))            
        } catch (error) {
            
        }
    },
}))

export default useStoreHubStore