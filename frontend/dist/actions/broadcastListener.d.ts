export declare type BroadcastType = "install_progress" | "install_state_changed" | "install_error";
export declare const init: () => void;
export declare const on: (action: string, callback: (args: any) => void) => void;
export declare const off: (action: string, callback: (args: any) => void) => void;
export declare const onPackage: (packageId: string, action: BroadcastType, callback: (args: any) => void) => void;
export declare const offPackage: (packageId: string, action: BroadcastType, callback: (args: any) => void) => void;
export declare const emitForPackage: (packageId: string, action: BroadcastType, callback: (args: any) => void) => void;
export declare const emit: (action: string, val: any) => void;
