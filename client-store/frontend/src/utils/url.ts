export enum UrlType {
    Http,
    IPFS,
    Unknown
}

export const identifyURL = (url:string) : UrlType => {
    if (!url || url.length < 4) return UrlType.Unknown
    if (url.substring(0,4) === "http") return UrlType.Http
    return UrlType.IPFS
}