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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
var defaultProps = {
    title: "",
    body: "",
    isOpen: false,
    onClose: function () { },
    onConfirm: function (e) { },
    style: {
        modal: {
            color: "white"
        },
        header: {
            backgroundColor: "#212529",
        },
        body: {
            backgroundColor: "#212529",
        },
        footer: {
            backgroundColor: "#212529",
        }
    }
};
export var ConfirmationModal = function (props) {
    return _jsxs(Modal, __assign({ centered: true, style: props.style.modal, isOpen: props.isOpen, toggle: props.onClose }, { children: [_jsx(ModalHeader, __assign({ style: props.style.header }, { children: props.title })), _jsx(ModalBody, __assign({ style: props.style.body }, { children: props.body })), _jsxs(ModalFooter, __assign({ style: props.style.footer }, { children: [_jsx(Button, __assign({ color: "danger", onClick: props.onConfirm }, { children: "Yes" })), ' ', _jsx(Button, __assign({ onClick: props.onClose }, { children: "No" }))] }))] }));
};
ConfirmationModal.defaultProps = defaultProps;
