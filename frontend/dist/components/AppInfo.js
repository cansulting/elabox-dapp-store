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
var AppButton_1 = require("./AppButton");
var AppInfoSetting_1 = require("./AppInfoSetting");
var colors_1 = require("../utils/colors");
var packageInfo_1 = require("../data/packageInfo");
var Notifications = function (props) {
    console.log(props);
    return (react_1.default.createElement(react_1.default.Fragment, null, props.data.map(function (val) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            val.type === "error" && react_1.default.createElement("p", { style: { color: 'red' } }, val.content),
            val.type === 'info' && react_1.default.createElement("p", { style: { color: 'green' } }, val.content),
            val.type === 'warning' && react_1.default.createElement("p", { style: { color: 'gray' } }, val.content)));
    })));
};
var SettingPopover = function (props) {
    return (react_1.default.createElement(reactstrap_1.UncontrolledPopover, { target: props.popOverRef, placement: "bottom", trigger: "legacy", offset: "0, 8" },
        react_1.default.createElement(reactstrap_1.PopoverBody, null,
            react_1.default.createElement(AppInfoSetting_1.AppInfoSetting, __assign({}, props.setting)))));
};
var AppInfo = function (props) {
    var settingPopoverRef = (0, react_1.useRef)(null);
    var progressColor = (0, colors_1.ProgressColor)(props.info.status);
    var info = props.info;
    var progress = info.progress;
    var handleInstall = function (evnt) {
        if (props.onInstall)
            props.onInstall(props.info);
    };
    var handleUninstall = function (evnt) {
        if (props.onUninstall)
            props.onUninstall(props.info);
    };
    var handleLaunch = function (evnt) {
        if (props.onUninstall)
            props.onLaunch(props.info);
    };
    var handleUpdate = function (evnt) {
        if (props.onUninstall)
            props.onUpdate(props.info);
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
            info.status === "installed" && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", { style: { cursor: 'pointer' }, className: "text-primary", id: "settingPopover", ref: settingPopoverRef },
                    react_1.default.createElement(Icon.Settings, null)),
                react_1.default.createElement(SettingPopover, { popOverRef: settingPopoverRef, setting: {
                        info: info,
                        customActions: props.customActions,
                        isService: props.info.isService,
                        onUnInstall: handleUninstall,
                        onResync: props.onResync,
                        onDisable: props.onDisable,
                        onRestart: props.onRestart,
                    } })))),
        react_1.default.createElement(reactstrap_1.Row, { lg: "2" },
            react_1.default.createElement(reactstrap_1.Col, { className: "text-center text-lg-start d-flex flex-column align-items-center", xs: "12", lg: "2" },
                react_1.default.createElement("img", { src: props.info.icon, alt: props.info.name, style: {
                        width: '130px',
                        height: '130px',
                        borderRadius: 10,
                    } })),
            react_1.default.createElement(reactstrap_1.Col, { className: "d-flex flex-column align-items-center align-items-lg-start align-self-end mt-3", style: { gap: 5 }, xs: "12", lg: "10" },
                react_1.default.createElement("h4", null, info.name),
                info.notificationContents &&
                    info.notificationContents.length > 0 &&
                    react_1.default.createElement(Notifications, { data: info.notificationContents }),
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                    } },
                    (0, packageInfo_1.isUpdatable)(props.info) && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", outline: true, onClick: handleUpdate }, "Update")),
                    info.status === "installed" && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", onClick: handleLaunch }, "Launch"))),
                info.status === "uninstalled" && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", outline: true, onClick: handleInstall }, "Install")),
                info.status !== "uninstalling" && progress > 0 && (react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                        width: '100%',
                    } },
                    react_1.default.createElement("p", null, (0, colors_1.UppercaseFirstLetter)(info.status)),
                    react_1.default.createElement(reactstrap_1.Progress, { style: { width: '30%' }, value: progress, color: progressColor, animated: false }))),
                info.status === "uninstalling" && (react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                        width: '100%',
                    } },
                    react_1.default.createElement("p", null, (0, colors_1.UppercaseFirstLetter)(info.status)))))),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("p", null, props.info.description),
                (info.status === "uninstalled" || (0, packageInfo_1.isUpdatable)(props.info)) && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("h4", null, "What's New"),
                    react_1.default.createElement("p", null, props.info.updates))))),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("h4", null, "Package details"),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("span", null,
                        "Package Id: ",
                        props.info.id),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", null,
                        "Version: ",
                        info.version),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement("span", null,
                        "Build: ",
                        info.currentBuild),
                    react_1.default.createElement("br", null)))),
        props.children));
};
exports.AppInfo = AppInfo;
