export declare function isExpired(url: string): boolean;
export declare function putCache(buf: ArrayBuffer, url: string): Promise<void>;
export declare function getCache(url: string): Promise<ArrayBuffer>;
