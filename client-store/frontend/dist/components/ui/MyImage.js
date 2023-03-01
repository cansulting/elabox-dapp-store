var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { identifyURL, UrlType } from "src/utils/url";
import IpfsImage from "./IpfsImage";
export var MyImage = function (props) {
    var imageType = identifyURL(props.icon);
    return (_jsxs("div", __assign({ style: {
            width: '100%', height: '100%',
            borderRadius: 10
        } }, { children: [imageType === UrlType.IPFS && _jsx(IpfsImage, { ipfsPath: props.icon, alt: props.name }), imageType === UrlType.Http && _jsx("img", { src: props.icon, alt: props.name, style: {
                    width: '150px', height: '150px',
                    borderRadius: 10
                } })] })));
};
