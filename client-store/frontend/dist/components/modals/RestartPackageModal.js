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
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import errorLogo from "../views/images/error.png";
var RestartModal = function (props) {
    var isOpen = props.isOpen, name = props.name, closeModal = props.closeModal;
    var _a = __read(useState(""), 2), password = _a[0], setPassword = _a[1];
    var _b = __read(useState(false), 2), errorModal = _b[0], setErrorModal = _b[1];
    var hamdleChangePassword = function (event) {
        var target = event.target;
        var name = target.name;
        setPassword(target.value);
    };
    var verifyPassword = function (action) {
        // e.preventDefault();
        closeModal(false);
    };
    var restartNode = function (pwd) {
        // e.preventDefault();
        closeModal();
    };
    var errorToggle = function () {
        setErrorModal(false);
    };
    return _jsxs(_Fragment, { children: [_jsxs(Modal, __assign({ isOpen: errorModal, centered: true }, { children: [_jsx(ModalHeader, { children: "Error" }), _jsxs(ModalBody, { children: ["Invalid password, please try again", _jsx("br", {}), _jsx("br", {}), _jsx("img", { src: errorLogo, style: { width: "50px", height: "50px" } })] }), _jsx(ModalFooter, { children: _jsx(Button, __assign({ color: "primary", onClick: errorToggle }, { children: "Close" })) })] })), _jsxs(Modal, __assign({ isOpen: isOpen, centered: true }, { children: [_jsxs(ModalHeader, { children: [" Restart ", name] }), _jsxs(ModalBody, { children: ["You are about to restart the ", name, _jsx("br", {}), "This process will take a few hours", _jsx("br", {}), _jsx("br", {}), _jsx("input", { type: "password", id: "pwd", name: "pwd", placeholder: "Enter password", required: true, onChange: hamdleChangePassword }), _jsx("br", {}), _jsx("br", {})] }), _jsxs(ModalFooter, { children: [_jsx(Button, __assign({ "data-testid": "restart-btn", color: "success", onClick: verifyPassword }, { children: "Restart" })), _jsx(Button, __assign({ color: "danger", onClick: closeModal }, { children: "Cancel" }))] })] }))] });
};
export default RestartModal;
