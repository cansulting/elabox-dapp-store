"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyModal = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var AppButton_1 = require("../../AppButton");
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
var DependencyModal = function (props) {
    return react_1.default.createElement(reactstrap_1.Modal, { centered: true, style: props.style.modal, isOpen: props.isOpen, toggle: props.onClose },
        react_1.default.createElement(reactstrap_1.ModalHeader, { style: props.style.header }, props.title),
        react_1.default.createElement(reactstrap_1.ModalBody, { style: props.style.body },
            react_1.default.createElement("h4", null, "Install Dependencies?"),
            react_1.default.createElement(Body, { dependencies: props.dependencies })),
        react_1.default.createElement(reactstrap_1.ModalFooter, { style: props.style.footer },
            react_1.default.createElement(AppButton_1.AppButton, { color: "primary", size: "sm", onClick: props.onConfirm }, "Confirm")));
};
exports.DependencyModal = DependencyModal;
var Body = function (props) {
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: 'd-flex justify-content-center', style: { gap: 10, marginTop: "5vh" } }, props.dependencies.map(function (info) {
            return react_1.default.createElement("div", null,
                react_1.default.createElement("img", { src: info.icon, alt: info.name, style: {
                        width: '130px',
                        height: '130px',
                        borderRadius: 10,
                    } }),
                react_1.default.createElement("p", null, info.name));
        })));
};
exports.DependencyModal.defaultProps = defaultProps;
