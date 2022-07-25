"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealData = exports.WithStats = exports.Syncing = exports.InstallationSuccess = exports.InstallationError = exports.Launchable = exports.Updatable = exports.UnInstalling = exports.Installing = exports.Downloading = exports.Installable = exports.Primary = void 0;
var react_1 = __importStar(require("react"));
var AppInfo_1 = require("../components/AppInfo");
var appLib_1 = require("../actions/appLib");
var addons_1 = require("@storybook/addons");
var AppInfoCon_1 = require("../container/AppInfoCon");
var reactstrap_1 = require("reactstrap");
var AppLineGraph_1 = require("../components/AppLineGraph");
exports.default = {
    title: 'Elabox/components/AppInfo',
    component: AppInfo_1.AppInfo,
};
var Template = function (props) { return react_1.default.createElement(AppInfo_1.AppInfo, __assign({}, props)); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    info: {
        "name": "Sample App",
        "id": "ela.sample",
        "description": "This is sample app",
        "icon": "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/vvtuyg7ay25uziwmpeac",
        "updates": "This is updates",
        "currentBuild": 2,
        "latestBuild": 3,
        "version": "0.1.0",
        "projectRepo": "",
        "projectWebsite": "",
        "status": "installed",
    },
    onInstall: function () { },
    onUninstall: function () { },
    style: { height: '100vh', padding: 10 },
};
exports.Installable = Template.bind({});
exports.Installable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { currentBuild: 0 }) });
exports.Downloading = Template.bind({});
exports.Downloading.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { progress: 30, status: 'downloading' }) });
exports.Installing = Template.bind({});
exports.Installing.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { progress: 90, status: 'installing' }) });
exports.UnInstalling = Template.bind({});
exports.UnInstalling.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { progress: 90, status: 'uninstalling' }) });
exports.Updatable = Template.bind({});
exports.Updatable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { currentBuild: 1, latestBuild: 2 }) });
exports.Launchable = Template.bind({});
exports.Launchable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { status: "installed", currentBuild: 1, latestBuild: 1 }) });
exports.InstallationError = Template.bind({});
exports.InstallationError.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 90, status: 'error', notificationContents: [{
                content: "This is a sample error",
                type: "error"
            }] }) });
exports.InstallationSuccess = Template.bind({});
exports.InstallationSuccess.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 100, processStatus: 'completed' }) });
exports.Syncing = Template.bind({});
exports.Syncing.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 20, processStatus: 'syncing' }) });
var TemplateStats = function (props) {
    var stats = Labels.map(function () { return Math.random(); });
    return (react_1.default.createElement(AppInfo_1.AppInfo, __assign({}, props), (stats === null || stats === void 0 ? void 0 : stats.length) > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement(AppLineGraph_1.AppLineGraph, { stats: stats }))),
        react_1.default.createElement(reactstrap_1.Row, null,
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement(reactstrap_1.Col, null, props.footer)))))));
};
var Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       '];
exports.WithStats = TemplateStats.bind({});
exports.WithStats.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { footer: (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h4", null, "Application Details"),
            react_1.default.createElement("p", null, "IP: 192.168.18.70"))), isService: true }) });
var Template2 = function (props) {
    var _a = __read((0, addons_1.useState)(null), 2), currentPkg = _a[0], setPkg = _a[1];
    (0, react_1.useEffect)(function () {
        if (currentPkg === null)
            (0, appLib_1.retrieveListing)("trinity.pasar")
                .then(function (pkg) {
                console.log(pkg);
                setPkg(pkg);
            });
    });
    if (currentPkg === null)
        return react_1.default.createElement(react_1.default.Fragment, null);
    return react_1.default.createElement(AppInfoCon_1.AppInfoCon, { info: currentPkg });
};
exports.RealData = Template2.bind({});
exports.RealData.args = __assign(__assign({}, exports.Primary.args), { info: __assign({}, exports.Primary.args.info) });
