export var UrlType;
(function (UrlType) {
    UrlType[UrlType["Http"] = 0] = "Http";
    UrlType[UrlType["IPFS"] = 1] = "IPFS";
    UrlType[UrlType["Unknown"] = 2] = "Unknown";
})(UrlType || (UrlType = {}));
export var identifyURL = function (url) {
    if (!url || url.length < 4)
        return UrlType.Unknown;
    if (url.substring(0, 4) === "http")
        return UrlType.Http;
    return UrlType.IPFS;
};
