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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppButton = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var AppButton = function (props) {
    if (props.isProcessing) {
        return (react_1.default.createElement(reactstrap_1.Button, __assign({}, props, { onClick: function (e) {
                e.preventDefault();
                props.onClick();
            } }),
            react_1.default.createElement(reactstrap_1.Spinner, { children: "" })));
    }
    else {
        return (react_1.default.createElement(reactstrap_1.Button, __assign({}, props, { onClick: function (e) {
                e.preventDefault();
                props.onClick();
            } }), props.children));
    }
};
exports.AppButton = AppButton;
