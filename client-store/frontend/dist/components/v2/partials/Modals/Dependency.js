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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AppButton } from '../../AppButton';
import { Modal } from "react-bootstrap";
var defaultProps = {
    title: "",
    dependencies: [],
    isOpen: false,
    onClose: function () { },
    onConfirm: function (e) { },
    style: {
        modal: {
            color: "white"
        },
        header: {
            backgroundColor: "#212529",
            display: "none",
        },
        body: {
            backgroundColor: "#212529",
            textAlign: "center"
        },
        footer: {
            backgroundColor: "#212529",
            border: "none",
        }
    }
};
export var DependencyModal = function (props) {
    return _jsxs(Modal, __assign({ centered: true, style: props.style.modal, isOpen: props.isOpen, toggle: props.onClose }, { children: [_jsx(Modal.Header, __assign({ style: props.style.header }, { children: props.title })), _jsxs(Modal.Body, __assign({ style: props.style.body }, { children: [_jsx("h4", { children: "Install Dependencies?" }), _jsx(Body, { dependencies: props.dependencies })] })), _jsx(Modal.Footer, __assign({ style: props.style.footer }, { children: _jsx(AppButton, __assign({ color: "primary", size: "sm", onClick: props.onConfirm }, { children: "Confirm" })) }))] }));
};
var Body = function (props) {
    return _jsx(_Fragment, { children: _jsx("div", __assign({ className: 'd-flex justify-content-center', style: { gap: 10, marginTop: "5vh" } }, { children: props.dependencies.map(function (info) {
                return _jsxs("div", { children: [_jsx("img", { src: info.icon, alt: info.name, style: {
                                width: '130px',
                                height: '130px',
                                borderRadius: 10,
                            } }), _jsx("p", { children: info.name })] });
            }) })) });
};
DependencyModal.defaultProps = defaultProps;
