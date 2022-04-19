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
exports.Processing = exports.Block = exports.Disabled = exports.Close = exports.Active = exports.Outline = exports.Info = exports.Danger = exports.Success = exports.Secondary = exports.Primary = void 0;
var react_1 = __importDefault(require("react"));
var AppButton_1 = require("../components/AppButton");
exports.default = {
    title: 'Elabox/components/AppButton',
    component: AppButton_1.AppButton,
};
var Template = function (props) { return (react_1.default.createElement(AppButton_1.AppButton, __assign({}, props), props.children)); };
exports.Primary = Template.bind({});
exports.Primary.args = {
    children: 'Primary',
    color: 'primary',
    outline: false,
    size: 'lg',
    block: false,
    active: false,
    close: false,
    disabled: false,
    isProcessing: false,
};
exports.Secondary = Template.bind({});
exports.Secondary.args = __assign(__assign({}, exports.Primary.args), { children: 'Secondary', color: 'secondary' });
exports.Success = Template.bind({});
exports.Success.args = __assign(__assign({}, exports.Primary.args), { children: 'Success', color: 'success' });
exports.Danger = Template.bind({});
exports.Danger.args = __assign(__assign({}, exports.Primary.args), { children: 'Danger', color: 'danger' });
exports.Info = Template.bind({});
exports.Info.args = __assign(__assign({}, exports.Primary.args), { children: 'Info', color: 'info' });
exports.Outline = Template.bind({});
exports.Outline.args = __assign(__assign({}, exports.Primary.args), { outline: true });
exports.Active = Template.bind({});
exports.Active.args = __assign(__assign({}, exports.Primary.args), { active: true });
exports.Close = Template.bind({});
exports.Close.args = __assign(__assign({}, exports.Primary.args), { close: true });
exports.Disabled = Template.bind({});
exports.Disabled.args = __assign(__assign({}, exports.Primary.args), { children: 'Disabled', disabled: true });
exports.Block = Template.bind({});
exports.Block.args = __assign(__assign({}, exports.Primary.args), { children: 'Block', block: true });
exports.Processing = Template.bind({});
exports.Processing.args = __assign(__assign({}, exports.Primary.args), { children: 'Processing', disabled: true, isProcessing: true });
