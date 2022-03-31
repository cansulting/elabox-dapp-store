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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealData = exports.CompleteDownloadingApp = exports.ErrorDownloadingApp = exports.UninstallingApp = exports.InstallingApp = exports.DownloadingApp = exports.DownloadableApp = exports.Primary = void 0;
var react_1 = __importStar(require("react"));
var AppDashboard_1 = require("../components/AppDashboard");
var appLib_1 = require("../actions/appLib");
exports.default = {
    title: 'Elabox/components/AppDashboard',
    component: AppDashboard_1.AppDashboard,
};
var Template = function (props) { return (react_1.default.createElement(AppDashboard_1.AppDashboard, __assign({}, props))); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
    ],
    style: { width: '50%' },
    iconWidth: "200px",
    iconHeight: "200px"
};
exports.DownloadableApp = Template.bind({});
exports.DownloadableApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            isInstallable: true,
        },
    ] });
exports.DownloadingApp = Template.bind({});
exports.DownloadingApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'downloading',
            percent: 50,
        },
    ] });
exports.InstallingApp = Template.bind({});
exports.InstallingApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'installing',
            percent: 50,
        },
    ] });
exports.UninstallingApp = Template.bind({});
exports.UninstallingApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'uninstalling',
            percent: 50,
        },
    ] });
exports.ErrorDownloadingApp = Template.bind({});
exports.ErrorDownloadingApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'error',
            percent: 70,
        },
    ] });
exports.CompleteDownloadingApp = Template.bind({});
exports.CompleteDownloadingApp.args = __assign(__assign({}, exports.Primary.args), { apps: [
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'completed',
            percent: 100,
        },
    ] });
var FetchRealdata = function (props) {
    var defaultv = [];
    var _a = (0, react_1.useState)(defaultv), pkgs = _a[0], setPkgs = _a[1];
    (0, react_1.useEffect)(function () {
        if (!pkgs || pkgs.length === 0) {
            (0, appLib_1.retrieveAllListings)()
                .then(function (res) {
                setPkgs(res);
            })
                .catch(function (err) { return console.log(err); });
        }
    });
    var onClick = function (app) {
        console.log("Selected " + app.id);
    };
    return react_1.default.createElement(AppDashboard_1.AppDashboard, { apps: pkgs, onClick: onClick });
};
exports.RealData = FetchRealdata.bind({});
exports.RealData.args = __assign(__assign({}, exports.Primary.args), { apps: null });
