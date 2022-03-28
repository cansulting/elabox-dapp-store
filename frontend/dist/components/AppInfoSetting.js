"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoSetting = void 0;
var react_1 = __importDefault(require("react"));
var AppInfoSetting = function (props) {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 5,
        } }, props.isService ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { style: { color: 'red', cursor: 'pointer' }, onClick: function (e) {
                e.preventDefault();
                props.onResync();
            } }, "Resync"),
        react_1.default.createElement("span", { style: { cursor: 'pointer' }, onClick: function (e) {
                e.preventDefault();
                props.onRestart();
            } }, "Restart"),
        react_1.default.createElement("span", { style: { cursor: 'pointer' }, onClick: function (e) {
                e.preventDefault();
                props.onDisable();
            } }, "Disable"))) : (react_1.default.createElement("span", { style: { color: 'red', cursor: 'pointer' }, onClick: function (e) {
            e.preventDefault();
            props.onUnInstall();
        } }, "Uninstall"))));
};
exports.AppInfoSetting = AppInfoSetting;
