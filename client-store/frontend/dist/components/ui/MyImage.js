import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { identifyURL, UrlType } from "../../utils/url";
import IpfsImage from "./IpfsImage";
export var MyImage = function (props) {
    var imageType = identifyURL(props.icon);
    return (_jsxs(_Fragment, { children: [imageType === UrlType.IPFS && _jsx(IpfsImage, { ipfsPath: props.icon, alt: props.name, style: {
                    width: '100%', height: '100%',
                    borderRadius: 10
                } }), imageType === UrlType.Http && _jsx("img", { src: props.icon, alt: props.name, style: {
                    width: '100px',
                    borderRadius: 10
                } })] }));
};
