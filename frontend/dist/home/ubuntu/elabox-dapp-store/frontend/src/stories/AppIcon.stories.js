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
exports.ProcessSuccess = exports.ProcessError = exports.Uninstalling = exports.Installing = exports.Notification = exports.Downloading = exports.Downloadable = exports.WithoutLabel = exports.WithLabel = void 0;
var react_1 = __importDefault(require("react"));
var AppIcon_1 = require("../components/AppIcon");
exports.default = {
    title: 'Elabox/components/AppIcon',
    component: AppIcon_1.AppIcon,
};
var Template = function (props) { return react_1.default.createElement(AppIcon_1.AppIcon, __assign({}, props)); };
exports.WithLabel = Template.bind({});
exports.WithLabel.args = {
    label: 'Glide',
    iconImg: 'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
    width: '200px',
    height: '200px',
    percent: 0,
    iconOnly: false,
    isInstallable: false,
    className: '',
};
exports.WithoutLabel = Template.bind({});
exports.WithoutLabel.args = __assign(__assign({}, exports.WithLabel.args), { iconOnly: true });
exports.Downloadable = Template.bind({});
exports.Downloadable.args = __assign(__assign({}, exports.WithLabel.args), { isInstallable: true });
exports.Downloading = Template.bind({});
exports.Downloading.args = __assign(__assign({}, exports.WithLabel.args), { percent: 50, processStatus: 'downloading' });
exports.Notification = Template.bind({});
exports.Notification.args = __assign(__assign({}, exports.WithLabel.args), { notification: 10 });
exports.Installing = Template.bind({});
exports.Installing.args = __assign(__assign({}, exports.WithLabel.args), { percent: 50, processStatus: 'installing' });
exports.Uninstalling = Template.bind({});
exports.Uninstalling.args = __assign(__assign({}, exports.WithLabel.args), { percent: 50, processStatus: 'uninstalling' });
exports.ProcessError = Template.bind({});
exports.ProcessError.args = __assign(__assign({}, exports.WithLabel.args), { percent: 50, processStatus: 'error' });
exports.ProcessSuccess = Template.bind({});
exports.ProcessSuccess.args = __assign(__assign({}, exports.WithLabel.args), { isDownloading: true, percent: 100, processStatus: 'completed' });
