"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoSetting = void 0;
var react_1 = __importDefault(require("react"));
var AppInfoSetting = function (props) {
    var _a;
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 5,
        } },
        props.isService &&
            react_1.default.createElement(react_1.default.Fragment, null,
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
                    } }, "Disable")),
        props.info.category !== 'system' &&
            react_1.default.createElement("span", { style: { color: 'red', cursor: 'pointer' }, onClick: function (e) {
                    e.preventDefault();
                    props.onUnInstall();
                } }, "Uninstall"), // render custom actions
    (_a = props.customActions) === null || _a === void 0 ? void 0 :
        _a.map(function (val) {
            return react_1.default.createElement("span", { style: { color: val.color, cursor: 'pointer' }, onClick: function (e) {
                    e.preventDefault();
                    if (val.onClick)
                        val.onClick(props.info);
                } }, val.label);
        })));
};
exports.AppInfoSetting = AppInfoSetting;
