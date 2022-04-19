"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDashboard = void 0;
var react_1 = __importDefault(require("react"));
var reactstrap_1 = require("reactstrap");
var AppIconCon_1 = require("../container/AppIconCon");
var AppDashboard = function (props) {
    if (props.apps === null)
        return react_1.default.createElement(react_1.default.Fragment, null);
    return (react_1.default.createElement(reactstrap_1.Container, { style: props.style, fluid: "md" },
        react_1.default.createElement(reactstrap_1.Row, { xs: "3" }, props.apps.map(function (appInfo) {
            return (react_1.default.createElement(reactstrap_1.Col, { key: appInfo.id + "-dash" },
                react_1.default.createElement(AppIconCon_1.AppIconCon, { package: appInfo, onClick: props.onClick, width: props.iconWidth, height: props.iconHeight })));
        }))));
};
exports.AppDashboard = AppDashboard;
