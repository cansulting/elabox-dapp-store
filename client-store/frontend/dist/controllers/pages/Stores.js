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
import StoresStyle from "../../assets/css/pages/stores.module.css";
import Stores from "../../components/Stores";
function StoresPage(props) {
    return (_jsxs("div", __assign({ className: StoresStyle["app-stores"] }, { children: [_jsx("h1", { children: "Explore" }), _jsx(Stores, { stores: props.stores, onStoreClick: props.onStoreClick })] })));
}
export default StoresPage;
