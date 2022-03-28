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
exports.AppInfo = void 0;
var react_1 = __importStar(require("react"));
var Icon = __importStar(require("react-feather"));
var reactstrap_1 = require("reactstrap");
var AppIcon_1 = require("./AppIcon");
var AppButton_1 = require("./AppButton");
var AppInfoSetting_1 = require("./AppInfoSetting");
var AppLineGraph_1 = require("./AppLineGraph");
var colors_1 = require("../utils/colors");
var SettingPopover = function (props) {
    return (react_1.default.createElement(reactstrap_1.UncontrolledPopover, { target: props.popOverRef, placement: "bottom", trigger: "legacy", offset: "0, 8" },
        react_1.default.createElement(reactstrap_1.PopoverBody, null,
            react_1.default.createElement(AppInfoSetting_1.AppInfoSetting, __assign({}, props.setting)))));
};
var AppInfo = function (props) {
    var _a, _b;
    var settingPopoverRef = (0, react_1.useRef)(null);
    var progressColor = (0, colors_1.ProgressColor)(props.info.processStatus);
    var AppIconDetails = {
        label: props.info.label,
        iconOnly: true,
        iconImg: props.info.iconImg,
        width: '130px',
        height: '130px',
        percent: props.info.percent,
        processStatus: props.info.processStatus,
    };
    return (react_1.default.createElement(reactstrap_1.Container, { style: props.style, fluid: "md" },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5,
            } },
            react_1.default.createElement("h3", { style: { cursor: 'pointer' }, onClick: props.onBack },
                react_1.default.createElement(Icon.ArrowLeftCircle, { style: { marginRight: 5 } }),
                "Apps"),
            !props.info.isInstallable &&
                !props.info.hasOwnProperty('processStatus') && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", { style: { cursor: 'pointer' }, className: "text-primary", id: "settingPopover", ref: settingPopoverRef },
                    react_1.default.createElement(Icon.Settings, null)),
                react_1.default.createElement(SettingPopover, { popOverRef: settingPopoverRef, setting: {
                        isService: props.info.isService,
                        onUnInstall: props.onUninstall,
                        onResync: props.onResync,
                        onDisable: props.onDisable,
                        onRestart: props.onRestart,
                    } })))),
        react_1.default.createElement(reactstrap_1.Row, { lg: "2" },
            react_1.default.createElement(reactstrap_1.Col, { className: "text-center text-lg-start d-flex flex-column align-items-center", xs: "12", lg: "2" },
                react_1.default.createElement(AppIcon_1.AppIcon, __assign({}, AppIconDetails))),
            react_1.default.createElement(reactstrap_1.Col, { className: "d-flex flex-column align-items-center align-items-lg-start align-self-end mt-3", style: { gap: 5 }, xs: "12", lg: "10" },
                react_1.default.createElement("h4", null, props.info.label),
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                    } },
                    props.info.isUpdatable && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", outline: true, onClick: props.onUpdate }, "Update")),
                    props.info.isLaunchable && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", onClick: props.onLaunch }, "Launch"))),
                props.info.isInstallable && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", outline: true }, "Install")),
                ((_a = props.info.processStatus) === null || _a === void 0 ? void 0 : _a.length) > 0 && (react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                        width: '100%',
                    } },
                    react_1.default.createElement("p", null, (0, colors_1.UppercaseFirstLetter)(props.info.processStatus)),
                    react_1.default.createElement(reactstrap_1.Progress, { style: { width: '30%' }, value: props.info.percent, color: progressColor, animated: props.info.processStatus ===
                            'downloading' ||
                            props.info.processStatus === 'syncing' ||
                            props.info.processStatus ===
                                'uninstalling' ||
                            props.info.processStatus === 'installing'
                            ? true
                            : false }))))),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null, props.info.body)),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("h4", null, "Package details"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("span", null,
                        "Package Id: ",
                        props.info.package.id),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", null,
                        "Version: ",
                        props.info.package.version),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", null,
                        "Build: ",
                        props.info.package.build),
                    react_1.default.createElement("br", null)))),
        ((_b = props.info.stats) === null || _b === void 0 ? void 0 : _b.length) > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(AppLineGraph_1.AppLineGraph, { stats: props.info.stats }))),
            react_1.default.createElement(reactstrap_1.Row, null,
                react_1.default.createElement(reactstrap_1.Col, null,
                    react_1.default.createElement(reactstrap_1.Col, null, props.info.footer)))))));
};
exports.AppInfo = AppInfo;
