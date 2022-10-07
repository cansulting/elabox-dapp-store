import create from "zustand";
import { devtools, persist } from 'zustand/middleware'
import { StoreInfo } from "../data/storeInfo";

const SIGNEDIN = "signedin"
const SIGNEDOUT = "signedout"
const SIGNING = "signing"
const SIGNINIT = "init"

interface StoreState {
    authStatus: string
    info?: StoreInfo | null
    setAuthStatus: (status: string) => void
}

export const useStoreState = create<StoreState>()(
    devtools(
        persist(
            (_set) => ({
                authStatus: SIGNINIT,
                setAuthStatus: (status) => _set((_) => ({authStatus: status}))
            }), {
                name: "store-storage"
            }
        )
    )
)