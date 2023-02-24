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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import * as Icon from 'react-feather';
import { Container, Row, Col, ProgressBar, Popover, PopoverBody, } from 'react-bootstrap';
import { AppButton } from './AppButton';
import { DependencyModal } from './partials/Modals/Dependency';
import { AppInfoSetting } from './AppInfoSetting';
import { ProgressColor } from '../../utils/colors';
import { isUpdatable, isUpdateCompat } from '../../data/packageInfo';
import { AppStatusToCaption } from '../../utils/appStatus';
import IpfsImage from '../ui/IpfsImage';
import { AppInfoToolbar } from './AppInfoToolbar';
var Notifications = function (props) {
    return (_jsx(_Fragment, { children: props.data.map(function (val) {
            return (_jsxs(_Fragment, { children: [val.type === "error" && _jsx("p", __assign({ style: { color: 'red' } }, { children: val.content })), val.type === 'info' && _jsx("p", __assign({ style: { color: 'green' } }, { children: val.content })), val.type === 'warning' && _jsx("p", __assign({ style: { color: 'gray' } }, { children: val.content }))] }));
        }) }));
};
var SettingPopover = function (props) {
    return (_jsx(Popover, __assign({ placement: "bottom" }, { children: _jsx(PopoverBody, { children: _jsx(AppInfoSetting, __assign({}, props.setting)) }) })));
};
export var AppInfo = function (props) {
    var _a, _b;
    var _c = __read(useState(false), 2), isOpenDependencyModal = _c[0], setIsOpenDependencyModal = _c[1];
    var settingPopoverRef = useRef(null);
    var progressColor = ProgressColor(props.info.status);
    var info = props.info;
    var progress = info.progress;
    var updatable = isUpdatable(props.info);
    var sysCompatible = isUpdateCompat(props.info);
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
    return (_jsxs(Container, __assign({ style: props.style, fluid: "md" }, { children: [_jsx(DependencyModal, { dependencies: props.info.dependencies, isOpen: isOpenDependencyModal, onClose: handleOnCloseDependencyModal, onConfirm: handleOnConfirmInstall }), _jsxs(Row, { children: [_jsx(Col, __assign({ className: "text-center text-lg-start d-flex flex-column align-items-center", xs: "12", lg: "12" }, { children: _jsx(IpfsImage, { src: props.info.icon, alt: props.info.name, style: {
                                width: '130px',
                                height: '130px',
                                borderRadius: 10,
                            } }) })), _jsxs(Col, __assign({ className: "d-flex flex-column align-items-center mt-3", style: { gap: 5 } }, { children: [_jsx("h4", { children: info.name }), info.notificationContents &&
                                info.notificationContents.length > 0 &&
                                _jsx(Notifications, { data: info.notificationContents }), (updatable || info.status === "uninstalled") && !sysCompatible &&
                                _jsx("p", __assign({ style: { color: 'gray' } }, { children: "Requires latest system to install this package." })), props.info.isService && props.info.status === "installed" && !props.info.enabled &&
                                _jsx("div", __assign({ className: "d-flex flex-column align-items-center", style: {
                                        width: '100%',
                                    } }, { children: _jsx("p", __assign({ style: { color: 'red' } }, { children: "Disabled" })) })), _jsx(AppInfoToolbar, { info: info, onUnInstall: handleUninstall, onCheckIfDependent: handleCheckIfDependency, onResync: props.onResync, onDisable: props.onDisable, onRestart: props.onRestart, onOff: handleOff, onOn: handleOn, onUpdate: handleUpdate, onLaunch: handleLaunch, onInstall: handleOnOpenDependencyModal, isDependent: props.isDependent }), info.status !== "uninstalling" && info.status !== "installed" && info.status !== "uninstalled" && (_jsxs("div", __assign({ className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                                    width: '100%',
                                } }, { children: [_jsx("p", { children: AppStatusToCaption(info.status) }), progress > 0 && _jsxs("div", __assign({ className: "d-flex align-items-center justify-content-center align-items-lg-center", style: { width: '30%', gap: 5 } }, { children: [_jsx(ProgressBar, { style: { width: "100%" }, now: progress, color: progressColor, animated: false }), _jsx(AppButton, __assign({ size: "sm", disabled: info.status !== "downloading", style: { width: "20px", height: "20px", padding: "0px" }, outline: true, variant: "light", onClick: handleCancel }, { children: _jsx(Icon.X, { className: "pb-1", color: "gray", size: 20 }) }))] }))] }))), (info.status === "uninstalling" || info.status === "wait_depends") && (_jsx("div", __assign({ className: "d-flex flex-column align-items-center align-items-lg-start", style: {
                                    width: '100%',
                                } }, { children: _jsx("p", { children: AppStatusToCaption(info.status) }) })))] }))] }), _jsx(Row, __assign({ className: "mt-4" }, { children: _jsx(Col, { children: _jsx("p", { children: props.info.description }) }) })), _jsx(Row, __assign({ className: "mt-4" }, { children: _jsxs(Col, { children: [_jsx("h4", { children: "What's New" }), _jsx("p", { children: props.info.updates })] }) })), _jsx(Row, __assign({ className: "mt-4" }, { children: _jsxs(Col, { children: [_jsx("h4", { children: "Package details" }), _jsxs("p", { children: [_jsxs("span", { children: ["Package Id: ", props.info.id] }), _jsx("br", {}), _jsxs("span", { children: ["Version: ", info.version] }), _jsx("br", {}), _jsxs("span", { children: ["Build: ", info.currentBuild] }), _jsx("br", {})] })] }) })), props.children, ((_a = props.info.dependencies) === null || _a === void 0 ? void 0 : _a.length) > 0 && _jsx(Row, __assign({ className: "mt-4" }, { children: _jsxs(Col, { children: [_jsx("h4", __assign({ className: 'mb-4' }, { children: "Depedencies" })), _jsx("div", __assign({ className: "d-flex text-center mt-2" }, { children: (_b = props.info.dependencies) === null || _b === void 0 ? void 0 : _b.map(function (dependency) {
                                return _jsxs("div", __assign({ style: { width: "15%" } }, { children: [_jsx("img", { src: dependency.icon, width: "50%" }), _jsx("p", { children: dependency.name })] }));
                            }) }))] }) }))] })));
};
