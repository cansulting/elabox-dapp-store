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
import Apps from "../../components/Apps";
import StoreStyle from "../../assets/css/pages/store.module.css";
import ButtonStyle from "../../assets/css/button.module.css";
function StoreDetailsPage(props) {
    return (_jsxs("div", __assign({ className: StoreStyle["app-store"] }, { children: [_jsxs("div", __assign({ className: StoreStyle["app-store-header"] }, { children: [_jsx("div", __assign({ className: StoreStyle["app-image-container"] }, { children: _jsx("img", { src: props === null || props === void 0 ? void 0 : props.icon, alt: "".concat(props === null || props === void 0 ? void 0 : props.title, " icon") }) })), _jsxs("div", __assign({ className: StoreStyle["app-body"] }, { children: [_jsxs("div", __assign({ className: StoreStyle["app-body-control"] }, { children: [_jsx("h1", { children: props === null || props === void 0 ? void 0 : props.title }), _jsx("button", __assign({ className: "".concat(ButtonStyle["primary"]) }, { children: "Subscribe" }))] })), _jsx("p", { children: props === null || props === void 0 ? void 0 : props.description })] }))] })), _jsx(Apps, { apps: props === null || props === void 0 ? void 0 : props.apps })] })));
}
export default StoreDetailsPage;
