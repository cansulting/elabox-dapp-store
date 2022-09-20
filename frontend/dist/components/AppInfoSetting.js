"use strict";
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
exports.AppInfoSetting = void 0;
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var Confirmation_1 = require("./partials/Modals/Confirmation");
var AppInfoSetting = function (props) {
    var _a;
    var _b = __read((0, react_1.useState)(false), 2), isServiceLoading = _b[0], setIsServiceLoading = _b[1];
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
    var _c = __read((0, react_1.useState)(false), 2), isOpenUninstallModal = _c[0], setIsOpenUninstallModal = _c[1];
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
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 5,
        } },
        react_1.default.createElement(Confirmation_1.ConfirmationModal, { title: "Uninstall ".concat(props.info.name), body: confirmationMessage, isOpen: isOpenUninstallModal, onClose: handleOnCloseUninstallModal, onConfirm: handleOnConfirmUninstall }),
        props.isService &&
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", { style: { color: 'red', cursor: 'pointer' }, onClick: function (e) {
                        e.preventDefault();
                        props.onResync();
                    } }, "Clear Data"),
                react_1.default.createElement("span", { style: { cursor: 'pointer' }, onClick: function (e) {
                        e.preventDefault();
                        if (props.onRestart)
                            props.onRestart();
                    } }, "Restart"),
                props.info.status === "installed" &&
                    react_1.default.createElement("span", { style: { cursor: 'pointer', color: "".concat(!props.info.enabled ? "green" : "red") }, onClick: handleServiceStatusChange },
                        isServiceLoading && react_1.default.createElement(reactstrap_1.Spinner, { children: "", size: "sm", color: "secondary" }),
                        props.info.enabled && !isServiceLoading && "Disable",
                        !props.info.enabled && !isServiceLoading && "Enable")),
        props.info.category !== 'system' &&
            react_1.default.createElement("span", { style: { color: 'red', cursor: 'pointer' }, onClick: handleOnOpenUninstallModal }, "Uninstall"), // render custom actions
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
