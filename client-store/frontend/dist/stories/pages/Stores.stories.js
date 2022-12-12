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
import StoresPage from "../../controllers/pages/Stores";
export default {
    title: "ClientStore/Pages/Stores",
    component: StoresPage,
};
var storesData = [
    {
        id: "1",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "2",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "3",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "4",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "5",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "6",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
    {
        id: "7",
        title: "test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    },
];
var handleStoreClick = function (id) {
};
var Template = function (props) {
    return _jsx(StoresPage, __assign({}, props));
};
export var StoresDummyData = Template.bind({});
StoresDummyData.args = {
    stores: storesData,
    onStoreClick: handleStoreClick
};
