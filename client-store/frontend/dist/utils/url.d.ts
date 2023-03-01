export declare enum UrlType {
    Http = 0,
    IPFS = 1,
    Unknown = 2
}
export declare const identifyURL: (url: string) => UrlType;
