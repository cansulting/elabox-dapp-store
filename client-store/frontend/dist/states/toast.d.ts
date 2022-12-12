export interface ToastMsg {
    title?: string;
    msg: string;
    type?: string;
}
interface UtilState {
    toasts: ToastMsg[];
    addToast: (msg: string, title?: string, type?: string) => void;
    removeToast: (msg: string) => void;
}
export declare const useUtilState: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UtilState>, "setState"> & {
    setState<A extends string | {
        type: unknown;
    }>(partial: UtilState | Partial<UtilState> | ((state: UtilState) => UtilState | Partial<UtilState>), replace?: boolean, action?: A): void;
}>;
export {};
