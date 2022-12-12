import { StoreProps } from "src/components/Store";
export interface StoreHubState {
    list: StoreProps[];
    fetchStores: () => Promise<any>;
}
export declare const useStoreHubStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StoreHubState>>;
export default useStoreHubStore;
