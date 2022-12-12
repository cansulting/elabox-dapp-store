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
import DashboardPage from '../../controllers/pages/Dashboard';
export default {
    title: "ClientStore/Pages/Dashboard",
    component: DashboardPage,
};
var storesData = [
    {
        id: "1",
        name: "test",
        icon: "test",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        currentBuild: 1,
        latestBuild: 1,
        status: "installed"
    },
    {
        id: "2",
        name: "test",
        icon: "test",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        currentBuild: 1,
        latestBuild: 1,
        status: "installed"
    },
    {
        id: "3",
        name: "test",
        icon: "test",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        currentBuild: 1,
        latestBuild: 1,
        status: "installed"
    },
];
var handleStoreClick = function (pkg) {
};
var handleOnExploreClick = function () {
    console.log("shown redirect to /store");
};
var Template = function (props) {
    return _jsx(DashboardPage, __assign({}, props));
};
export var DashboardDummyData = Template.bind({});
DashboardDummyData.args = {
    apps: storesData,
    onSelected: handleStoreClick,
    onExploreClick: handleOnExploreClick
};
