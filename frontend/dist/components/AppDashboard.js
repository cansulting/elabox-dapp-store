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
exports.AppDashboard = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var AppIcon_1 = require("./AppIcon");
var AppDashboard = function (props) {
    return (react_1.default.createElement(reactstrap_1.Container, { style: props.style, fluid: "md" },
        react_1.default.createElement(reactstrap_1.Row, { xs: "3" }, props.apps.map(function (appInfo) {
            return (react_1.default.createElement(reactstrap_1.Col, null,
                react_1.default.createElement(AppIcon_1.AppIcon, __assign({}, appInfo))));
        }))));
};
exports.AppDashboard = AppDashboard;
