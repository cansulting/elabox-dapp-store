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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AllViewDashboard from '../../controllers/v2/AllViewDashboard';
import { AppInfoCon } from '../../controllers/v2';
import { AppDashboard } from '../../components/v2';
export default {
    title: 'Elabox/components/AppDashboard',
    component: AppDashboard,
};
var Template = function (props) { return (_jsx(AppDashboard, __assign({}, props))); };
export var Primary = Template.bind({});
Primary.args = {
    apps: [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: "installed",
        },
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: "installed",
        },
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: "installed",
        },
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: "installed",
        }
    ],
    style: { width: '50%' },
};
export var DownloadableApp = Template.bind({});
DownloadableApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            status: "uninstalled",
        }
    ], false) });
export var DownloadingApp = Template.bind({});
DownloadingApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            progress: 50,
            status: "downloading",
        }
    ], false) });
export var InstallingApp = Template.bind({});
InstallingApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            progress: 90,
            status: 'installing',
        }
    ], false) });
export var UninstallingApp = Template.bind({});
UninstallingApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: 'uninstalling',
        }
    ], false) });
export var ErrorDownloadingApp = Template.bind({});
ErrorDownloadingApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            progress: 90,
            status: 'error',
            notificationContents: [{
                    content: "This is a sample error",
                    type: "error"
                }]
        }
    ], false) });
export var CompleteDownloadingApp = Template.bind({});
CompleteDownloadingApp.args = __assign(__assign({}, Primary.args), { apps: __spreadArray(__spreadArray([], __read(Primary.args.apps), false), [
        {
            icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            progress: 90,
            status: 'error',
            notificationContents: [{
                    content: "This is a sample error",
                    type: "error"
                }]
        }
    ], false) });
var FetchRealdata = function (props) {
    var _a = __read(React.useState(null), 2), activeApp = _a[0], setActiveApp = _a[1];
    var onClick = function (app) {
        console.log("Selected " + app.id);
        setActiveApp(app);
    };
    var onBack = function () {
        setActiveApp(null);
    };
    return (_jsx(BrowserRouter, { children: _jsxs("div", __assign({ style: { width: "100%", backgroundColor: "#1E1E26", color: "white", padding: 20 } }, { children: [!activeApp && _jsx(AllViewDashboard, { iconWidth: 130, iconHeight: 130, onClick: onClick, apps: [] }), activeApp && _jsx(AppInfoCon, { info: activeApp, onBack: onBack })] })) }));
};
export var RealData = FetchRealdata.bind({});
RealData.args = __assign(__assign({}, Primary.args), { apps: null });
