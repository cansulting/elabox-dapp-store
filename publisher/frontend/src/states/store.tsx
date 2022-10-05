import create from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { StoreInfo } from "../data/storeInfo";

interface StoreState {
    info?: StoreInfo | null
}

const useStoreState = create<StoreState>()(
    devtools(
        persist(
            (_set) => ({
                
            }), {
                name: "store-storage"
            }
        )
    )
)