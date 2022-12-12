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
import AppStyle from "../assets/css/components/app.module.css";
function App(props) {
    return (_jsxs("div", __assign({ className: AppStyle["app"] }, { children: [_jsx("div", __assign({ className: AppStyle["app-body"] }, { children: _jsx("img", { src: props.icon, alt: props.title }) })), _jsx("div", __assign({ className: AppStyle["app-footer"] }, { children: _jsx("h3", { children: props.title }) }))] })));
}
export default App;
