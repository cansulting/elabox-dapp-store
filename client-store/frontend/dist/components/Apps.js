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
import { useRef } from "react";
import useResize from "../hooks/useResize";
import App from "./App";
import AppsStyle from "../assets/css/components/apps.module.css";
function Apps(props) {
    var _a;
    var parentDiv = useRef(null);
    var parentWidth = useResize(parentDiv).width;
    var columnPerRow = Math.round((parentWidth - 100) / 160);
    var isCenteredColumns = columnPerRow < 4;
    return _jsxs("div", __assign({ className: AppsStyle['apps'] }, { children: [_jsx("h1", { children: "Apps" }), _jsx("div", __assign({ className: AppsStyle["apps-list"], ref: parentDiv, style: {
                    gridTemplateColumns: "repeat(".concat(columnPerRow, ",150px)"),
                    justifyContent: isCenteredColumns ? 'center' : 'flex-start'
                } }, { children: (_a = props === null || props === void 0 ? void 0 : props.apps) === null || _a === void 0 ? void 0 : _a.map(function (app) { return (_jsx(App, { id: app.id, title: app.name, icon: app.icon }, app.id)); }) }))] }));
}
export default Apps;
