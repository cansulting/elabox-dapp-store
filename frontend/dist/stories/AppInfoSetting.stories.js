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
exports.IsService = exports.Primary = void 0;
var react_1 = __importDefault(require("react"));
var AppInfoSetting_1 = require("../components/AppInfoSetting");
exports.default = {
    title: 'Elabox/components/AppInfoSetting',
    component: AppInfoSetting_1.AppInfoSetting,
};
var Template = function (props) { return (react_1.default.createElement(AppInfoSetting_1.AppInfoSetting, __assign({}, props))); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    isService: false,
    onUnInstall: function () { },
};
exports.IsService = Template.bind({});
exports.IsService.args = __assign(__assign({}, exports.Primary.args), { isService: true, onResync: function () { }, onDisable: function () { }, onRestart: function () { } });
