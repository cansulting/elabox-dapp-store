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
import Store from "../../components/Store";
export default {
    title: "ClientStore/Components/Store",
    component: Store
};
var Template = function (props) {
    return _jsx(Store, __assign({}, props));
};
var handleOnClick = function (id) {
};
export var StoreWithDummyData = Template.bind({});
StoreWithDummyData.args = {
    id: "1",
    title: "test",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    onClick: handleOnClick
};
