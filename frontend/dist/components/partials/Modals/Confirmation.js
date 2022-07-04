"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationModal = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
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
var ConfirmationModal = function (props) {
    return react_1.default.createElement(reactstrap_1.Modal, { centered: true, style: props.style.modal, isOpen: props.isOpen, toggle: props.onClose },
        react_1.default.createElement(reactstrap_1.ModalHeader, { style: props.style.header }, props.title),
        react_1.default.createElement(reactstrap_1.ModalBody, { style: props.style.body }, props.body),
        react_1.default.createElement(reactstrap_1.ModalFooter, { style: props.style.footer },
            react_1.default.createElement(reactstrap_1.Button, { color: "danger", onClick: props.onConfirm }, "Yes"),
            ' ',
            react_1.default.createElement(reactstrap_1.Button, { onClick: props.onClose }, "No")));
};
exports.ConfirmationModal = ConfirmationModal;
exports.ConfirmationModal.defaultProps = defaultProps;
