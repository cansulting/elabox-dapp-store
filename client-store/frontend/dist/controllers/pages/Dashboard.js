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
import DashboardStyle from "../../assets/css/pages/dashboard.module.css";
import Apps from "../../components/Apps";
import TopBar from "../../components/ui/TopBar";
function DashboardPage(props) {
    return (_jsxs("div", __assign({ className: DashboardStyle["app-dashboard"] }, { children: [_jsx(TopBar, {}), _jsx("h1", { children: "Popular" }), _jsx(Apps, { apps: props.apps, onSelected: props.onSelected }), _jsx("h1", { children: "Latest" }), _jsx(Apps, { apps: props.apps, onSelected: props.onSelected })] })));
}
export default DashboardPage;
