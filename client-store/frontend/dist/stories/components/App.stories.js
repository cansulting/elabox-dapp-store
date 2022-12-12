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
import App from "../../components/App";
export default {
    title: "ClientStore/Components/App",
    component: App
};
var Template = function (props) {
    return _jsx(App, __assign({}, props));
};
export var AppWithDummyData = Template.bind({});
AppWithDummyData.args = {
    id: "1",
    title: "test",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png"
};
