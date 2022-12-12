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
import StoreStyle from "../assets/css/components/store.module.css";
function Store(props) {
    var handleStoreClick = function (event) {
        if (props.onClick !== undefined) {
            props.onClick(props.id);
        }
    };
    return (_jsxs("div", __assign({ className: StoreStyle["app-store"], onClick: handleStoreClick }, { children: [_jsx("div", __assign({ className: StoreStyle["app-store-body"] }, { children: _jsx("img", { src: props === null || props === void 0 ? void 0 : props.icon, alt: props === null || props === void 0 ? void 0 : props.title }) })), _jsx("div", __assign({ className: StoreStyle["app-store-footer"] }, { children: _jsx("h3", { children: props === null || props === void 0 ? void 0 : props.title }) }))] })));
}
export default Store;
