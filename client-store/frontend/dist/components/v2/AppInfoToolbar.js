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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { isLaunchable, isUpdatable, isUpdateCompat } from '../../data/packageInfo';
import { AppButton } from './AppButton';
import { ConfirmationModal } from './partials/Modals/Confirmation';
export var AppInfoToolbar = function (props) {
    var _a = __read(useState(false), 2), isServiceLoading = _a[0], setIsServiceLoading = _a[1];
    var updatable = isUpdatable(props.info);
    var sysCompatible = isUpdateCompat(props.info);
    var handleServiceStatusChange = function (e) {
        e.preventDefault();
        setIsServiceLoading(true);
        if (props.info.enabled) {
            props.onOff().then(function () {
                setIsServiceLoading(false);
            });
            return;
        }
        props.onOn().then(function () {
            setIsServiceLoading(false);
        });
    };
    var _b = __read(useState(false), 2), isOpenUninstallModal = _b[0], setIsOpenUninstallModal = _b[1];
    var handleOnOpenUninstallModal = function (e) {
        e.preventDefault();
        props.onCheckIfDependent();
        setIsOpenUninstallModal(true);
    };
    var handleOnCloseUninstallModal = function () {
        setIsOpenUninstallModal(false);
    };
    var handleOnConfirmUninstall = function (e) {
        e.preventDefault();
        props.onUnInstall();
        setIsOpenUninstallModal(false);
    };
    var confirmationMessage = props.isDependent ?
        "You are about to uninstall a package that is required by other packages. Uninstalling might affects its functionality." :
        "Are you sure you want to permanently remove ".concat(props.info.name, " including its data?");
    return (_jsxs("div", __assign({ style: {
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
        } }, { children: [_jsx(ConfirmationModal, { title: "Uninstall ".concat(props.info.name), body: confirmationMessage, isOpen: isOpenUninstallModal, onClose: handleOnCloseUninstallModal, onConfirm: handleOnConfirmUninstall }), sysCompatible && updatable && (_jsx(AppButton, __assign({ size: "sm", active: sysCompatible, outline: true, onClick: props.onUpdate }, { children: "Update" }))), sysCompatible && props.info.status === "uninstalled" && (_jsx(AppButton, __assign({ size: "sm", outline: true, onClick: props.onInstall }, { children: "Install" }))), props.info.isService &&
                _jsxs(_Fragment, { children: [_jsx(AppButton, __assign({ color: "danger", size: "sm", outline: true, onClick: props.onResync }, { children: "Clear Data" })), _jsx(AppButton, __assign({ color: "danger", size: "sm", outline: true, onClick: props.onRestart }, { children: "Restart" })), props.info.status === "installed" &&
                            _jsxs(AppButton, __assign({ color: !props.info.enabled ? "primary" : "danger", size: "sm", outline: true, onClick: handleServiceStatusChange }, { children: [isServiceLoading && _jsx(Spinner, { children: "", size: "sm", color: "secondary", animation: 'border' }), props.info.enabled && !isServiceLoading && "Disable", !props.info.enabled && !isServiceLoading && "Enable"] }))] }), props.info.status === 'installed' && props.info.category !== 'system' &&
                _jsx(AppButton, __assign({ color: "danger", size: "sm", outline: true, onClick: handleOnOpenUninstallModal }, { children: "Uninstall" })), isLaunchable(props.info) && (_jsx(AppButton, __assign({ size: "sm", onClick: props.onLaunch }, { children: "Launch" })))] })));
};
