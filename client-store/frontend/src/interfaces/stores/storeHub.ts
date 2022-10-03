import { StoreProps } from "../Store"

export interface StoreHubState {
    list : StoreProps[]
    fetchStores: () => Promise<any>
}