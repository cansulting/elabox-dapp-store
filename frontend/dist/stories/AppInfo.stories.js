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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithStats = exports.Syncing = exports.InstallationSuccess = exports.InstallationError = exports.Launchable = exports.Updatable = exports.UnInstalling = exports.Installing = exports.Downloading = exports.Installable = exports.Primary = void 0;
var react_1 = __importDefault(require("react"));
var AppInfo_1 = require("../components/AppInfo");
exports.default = {
    title: 'Elabox/components/AppInfo',
    component: AppInfo_1.AppInfo,
};
var Template = function (props) { return react_1.default.createElement(AppInfo_1.AppInfo, __assign({}, props)); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    info: {
        label: 'Glide',
        iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
        package: {
            id: '10001',
            version: '1.0.0',
            build: '1.0.1',
        },
        body: (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."))),
        footer: react_1.default.createElement(react_1.default.Fragment, null),
        percent: 0,
        isInstallable: false,
    },
    onInstall: function () { },
    onUninstall: function () { },
    style: { height: '100vh', padding: 10 },
};
exports.Installable = Template.bind({});
exports.Installable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 0, isInstallable: true }) });
exports.Downloading = Template.bind({});
exports.Downloading.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 30, processStatus: 'downloading' }) });
exports.Installing = Template.bind({});
exports.Installing.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 90, processStatus: 'installing' }) });
exports.UnInstalling = Template.bind({});
exports.UnInstalling.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 90, processStatus: 'uninstalling' }) });
exports.Updatable = Template.bind({});
exports.Updatable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { body: (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("p", null, "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."),
            react_1.default.createElement("h4", null, "What's new"),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null, "Lorem lorem"),
                react_1.default.createElement("li", null, "Lorem lorem")))), isUpdatable: true }) });
exports.Launchable = Template.bind({});
exports.Launchable.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { isUpdatable: true, isLaunchable: true }) });
exports.InstallationError = Template.bind({});
exports.InstallationError.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 90, processStatus: 'error' }) });
exports.InstallationSuccess = Template.bind({});
exports.InstallationSuccess.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 100, processStatus: 'completed' }) });
exports.Syncing = Template.bind({});
exports.Syncing.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { percent: 20, processStatus: 'syncing' }) });
var Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       '];
exports.WithStats = Template.bind({});
exports.WithStats.args = __assign(__assign({}, exports.Primary.args), { info: __assign(__assign({}, exports.Primary.args.info), { footer: (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("h4", null, "Application Details"),
            react_1.default.createElement("p", null, "IP: 192.168.18.70"))), stats: Labels.map(function () { return Math.random(); }), isService: true }) });
