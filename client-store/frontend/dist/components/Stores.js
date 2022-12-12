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
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import useResize from "../hooks/useResize";
import Store from "./Store";
import StoresStyle from "../assets/css/components/stores.module.css";
function Stores(props) {
    var _a;
    var parentDiv = useRef(null);
    var parentWidth = useResize(parentDiv).width;
    var columnPerRow = Math.round((parentWidth - 100) / 160);
    var isCenteredColumns = columnPerRow < 4;
    return (_jsx("div", __assign({ className: StoresStyle["app-stores"], ref: parentDiv, style: {
            gridTemplateColumns: "repeat(".concat(columnPerRow, ",150px)"),
            justifyContent: isCenteredColumns ? 'center' : 'flex-start'
        } }, { children: (_a = props.stores) === null || _a === void 0 ? void 0 : _a.map(function (details) { return (_jsx(Store, { id: details.id, icon: details.icon, title: details.title, onClick: props.onStoreClick }, details.id)); }) })));
}
export default Stores;
