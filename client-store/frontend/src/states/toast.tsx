import create from "zustand";
import { devtools } from "zustand/middleware";

const toast_timeout = 6000
export interface ToastMsg {
    title?: string
    msg: string
    type?: string
}

interface UtilState {
    toasts: ToastMsg[]
    addToast: (msg: string, title?: string, type?:string) => void
    removeToast: (msg: string) => void
}

export const useUtilState = create<UtilState>() (
    devtools(
         (set, get) => ({
            toasts: [],
            addToast: (msg: string, title?: string, type?:string) => {
                const ntoasts = [...get().toasts]
                ntoasts.push({msg: msg, title: title, type: type})
                set( _ => ({toasts: ntoasts}))
                setTimeout(() => {
                    console.log("TIMEOUT")
                    const nToasts = get().toasts
                    nToasts.shift()
                    set( _ => ({toasts:nToasts}))
                }, toast_timeout)
            },
            removeToast: (msg:string) => {
                let nToasts = get().toasts
                const i = nToasts.findIndex( (v, index) => 
                    v.msg === msg
                )
                if (i < 0) return;
                nToasts = nToasts.slice(i)
                //console.log("found", i, nToasts)
                set( _ => ({toasts:nToasts}))
            }
        })
    )
)