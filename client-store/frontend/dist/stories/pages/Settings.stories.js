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
import SettingsPage from "../../controllers/pages/Settings";
export default {
    title: "ClientStore/Pages/Settings",
    component: SettingsPage,
};
var handleAddHub = function (hub) {
};
var Template = function (props) {
    return _jsx(SettingsPage, __assign({}, props));
};
export var SettingsDummyData = Template.bind({});
SettingsDummyData.args = {
    hubs: ["www.test.com", "www.test1.com", "www.test2.com"],
    onAddHub: handleAddHub
};
