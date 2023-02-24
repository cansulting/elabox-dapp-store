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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import "../../assets/css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from '@storybook/addons';
import { AppInfo } from '../../components/v2';
import { retrieveListing } from '../../api/store';
import { AppInfoCon } from '../../controllers/v2';
export default {
    title: 'Elabox/components/AppInfo',
    component: AppInfo,
};
var Template = function (props) { return _jsx(AppInfo, __assign({}, props)); };
export var Primary = Template.bind({});
Primary.args = {
    info: {
        "name": "Sample App",
        "id": "ela.sample",
        "description": "This is sample app",
        "icon": "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/vvtuyg7ay25uziwmpeac",
        "updates": "This is updates",
        "currentBuild": 3,
        "latestBuild": 3,
        "version": "0.1.0",
        "status": "installed",
    },
    onInstall: function () { },
    onUninstall: function () { },
    style: { height: '100vh', padding: 10 },
};
export var Installable = Template.bind({});
Installable.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { status: "uninstalled", currentBuild: 0 }) });
export var Downloading = Template.bind({});
Downloading.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 30, status: 'downloading' }) });
export var Installing = Template.bind({});
Installing.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 90, status: 'installing' }) });
export var UnInstalling = Template.bind({});
UnInstalling.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 90, status: 'uninstalling' }) });
export var Updatable = Template.bind({});
Updatable.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { currentBuild: 1, latestBuild: 2 }) });
export var Launchable = Template.bind({});
Launchable.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { status: "installed", currentBuild: 1, latestBuild: 1 }) });
export var InstallationError = Template.bind({});
InstallationError.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 90, status: 'error', notificationContents: [{
                content: "This is a sample error",
                type: "error"
            }] }) });
export var InstallationSuccess = Template.bind({});
InstallationSuccess.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 100, status: 'installed' }) });
export var Syncing = Template.bind({});
Syncing.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { progress: 20, status: 'syncing' }) });
var TemplateStats = function (props) {
    var stats = Labels.map(function () { return Math.random(); });
    return (_jsx(AppInfo, __assign({}, props)));
};
var Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       '];
export var WithStats = TemplateStats.bind({});
WithStats.args = __assign(__assign({}, Primary.args), { info: __assign(__assign({}, Primary.args.info), { isService: true }), footer: (_jsxs(_Fragment, { children: [_jsx("h4", { children: "Application Details" }), _jsx("p", { children: "IP: 192.168.18.70" })] })) });
var Template2 = function (props) {
    var _a = __read(useState(null), 2), currentPkg = _a[0], setPkg = _a[1];
    useEffect(function () {
        if (currentPkg === null)
            retrieveListing("trinity.pasar")
                .then(function (pkg) {
                console.log(pkg);
                setPkg(pkg);
            });
    });
    if (currentPkg === null)
        return _jsx(_Fragment, {});
    return _jsx(AppInfoCon, { info: currentPkg });
};
export var RealData = Template2.bind({});
RealData.args = __assign(__assign({}, Primary.args), { info: __assign({}, Primary.args.info) });
