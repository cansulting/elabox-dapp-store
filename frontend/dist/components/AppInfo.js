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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.AppInfo = void 0;
var react_1 = __importStar(require("react"));
var react_hot_toast_1 = require("react-hot-toast");
var Icon = __importStar(require("react-feather"));
var reactstrap_1 = require("reactstrap");
var AppButton_1 = require("./AppButton");
var Dependency_1 = require("./partials/Modals/Dependency");
var AppInfoSetting_1 = require("./AppInfoSetting");
var colors_1 = require("../utils/colors");
var packageInfo_1 = require("../data/packageInfo");
var appStatus_1 = require("../utils/appStatus");
var Notifications = function (props) {
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
    var _a, _b;
    var _c = __read((0, react_1.useState)(false), 2), isOpenDependencyModal = _c[0], setIsOpenDependencyModal = _c[1];
    var settingPopoverRef = (0, react_1.useRef)(null);
    var progressColor = (0, colors_1.ProgressColor)(props.info.status);
    var info = props.info;
    var progress = info.progress;
    var updatable = (0, packageInfo_1.isUpdatable)(props.info);
    var sysCompatible = (0, packageInfo_1.isUpdateCompat)(props.info);
    if (!(progress > 0) && props.info.status === "installing")
        progress = 95;
    var handleInstall = function () {
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
    var handleCancel = function (evnt) {
        if (props.onCancel)
            props.onCancel(props.info);
    };
    var handleUpdate = function (evnt) {
        if (props.onUninstall && sysCompatible)
            props.onUpdate(props.info);
    };
    var handleCheckIfDependency = function (evnt) {
        props.onCheckIfDependent(props.info);
    };
    var handleOnOpenDependencyModal = function () {
        if (props.info.dependencies && props.info.dependencies.length > 0) {
            setIsOpenDependencyModal(true);
            return;
        }
        setIsOpenDependencyModal(false);
        handleInstall();
    };
    var handleOnCloseDependencyModal = function () {
        setIsOpenDependencyModal(false);
    };
    var handleOnConfirmInstall = function () {
        setIsOpenDependencyModal(false);
        handleInstall();
    };
    var handleOff = function () {
        return props.onOff(props.info);
    };
    var handleOn = function () {
        return props.onOn(props.info);
    };
    return (react_1.default.createElement(reactstrap_1.Container, { style: props.style, fluid: "md" },
        react_1.default.createElement(react_hot_toast_1.Toaster, { containerStyle: { top: 30 } }),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 5,
            } },
            react_1.default.createElement(Dependency_1.DependencyModal, { dependencies: props.info.dependencies, isOpen: isOpenDependencyModal, onClose: handleOnCloseDependencyModal, onConfirm: handleOnConfirmInstall }),
            react_1.default.createElement("h3", { style: { cursor: 'pointer' }, onClick: props.onBack },
                react_1.default.createElement("p", { style: { display: 'flex', alignItems: 'center' } },
                    react_1.default.createElement(Icon.ArrowLeftCircle, { style: { marginRight: 5, color: '#0d6efd' } }),
                    react_1.default.createElement("span", null,
                        react_1.default.createElement("h5", { style: { color: '#0d6efd', margin: 0 } }, "Apps")))),
            info.status === "installed" && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", { style: { cursor: 'pointer' }, className: "text-primary", id: "settingPopover", ref: settingPopoverRef },
                    react_1.default.createElement(Icon.Settings, null)),
                react_1.default.createElement(SettingPopover, { popOverRef: settingPopoverRef, setting: {
                        info: info,
                        customActions: props.customActions,
                        isService: props.info.isService,
                        onUnInstall: handleUninstall,
                        onCheckIfDependent: handleCheckIfDependency,
                        onResync: props.onResync,
                        onDisable: props.onDisable,
                        onRestart: props.onRestart,
                        onOff: handleOff,
                        onOn: handleOn,
                        isDependent: props.isDependent,
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
                (updatable || info.status === "uninstalled") && !sysCompatible &&
                    react_1.default.createElement("p", { style: { color: 'gray' } }, "Requires latest system to install this package."),
                props.info.isService && props.info.status === "installed" && !props.info.enabled &&
                    react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                            width: '100%',
                        } },
                        react_1.default.createElement("p", { style: { color: 'red' } }, "Disabled")),
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                    } },
                    sysCompatible && updatable && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", active: sysCompatible, outline: true, onClick: handleUpdate }, "Update")),
                    (0, packageInfo_1.isLaunchable)(info) && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", onClick: handleLaunch }, "Launch"))),
                sysCompatible && info.status === "uninstalled" && (react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", outline: true, onClick: handleOnOpenDependencyModal }, "Install")),
                info.status !== "uninstalling" && info.status !== "installed" && info.status !== "uninstalled" && (react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                        width: '100%',
                    } },
                    react_1.default.createElement("p", null, (0, appStatus_1.AppStatusToCaption)(info.status)),
                    progress > 0 && react_1.default.createElement("div", { className: "d-flex align-items-center justify-content-center align-items-lg-center", style: { width: '30%', gap: 5 } },
                        react_1.default.createElement(reactstrap_1.Progress, { style: { width: "100%" }, value: progress, color: progressColor, animated: false }),
                        react_1.default.createElement(AppButton_1.AppButton, { color: "danger", size: "sm", disabled: info.status !== "downloading", outline: true, onClick: handleCancel },
                            react_1.default.createElement(Icon.X, { className: "pb-1", color: "white", size: 14 }))))),
                (info.status === "uninstalling" || info.status === "wait_depends") && (react_1.default.createElement("div", { className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                        width: '100%',
                    } },
                    react_1.default.createElement("p", null, (0, appStatus_1.AppStatusToCaption)(info.status)))))),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("p", null, props.info.description))),
        react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("h4", null, "What's New"),
                react_1.default.createElement("p", null, props.info.updates))),
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
        props.children,
        ((_a = props.info.dependencies) === null || _a === void 0 ? void 0 : _a.length) > 0 && react_1.default.createElement(reactstrap_1.Row, { className: "mt-4" },
            react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement("h4", { className: 'mb-4' }, "Depedencies"),
                react_1.default.createElement("div", { className: "d-flex text-center mt-2" }, (_b = props.info.dependencies) === null || _b === void 0 ? void 0 : _b.map(function (dependency) {
                    return react_1.default.createElement("div", { style: { width: "15%" } },
                        react_1.default.createElement("img", { src: dependency.icon, width: "50%" }),
                        react_1.default.createElement("p", null, dependency.name));
                }))))));
};
exports.AppInfo = AppInfo;
