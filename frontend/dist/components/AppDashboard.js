"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDashboard = void 0;
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var AppIconCon_1 = require("../container/AppIconCon");
var useResize_1 = __importDefault(require("../hooks/useResize"));
var currentWidth = 0;
var AppDashboard = function (props) {
    var parentDiv = (0, react_1.useRef)(null);
    var parentWidth = (0, useResize_1.default)(parentDiv).width;
    var iconWidthWithPadding = props.iconWidth + 20;
    var columnPerRow = Math.round(parentWidth / iconWidthWithPadding);
    var columnWidth = Math.round(parentWidth / columnPerRow);
    currentWidth = !isNaN(columnWidth) ? columnWidth : 0;
    if (props.apps === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { style: props.style, ref: parentDiv },
        react_1.default.createElement(reactstrap_1.Row, { className: "gx-2", xs: columnPerRow }, props.apps.map(function (appInfo) {
            return (react_1.default.createElement(reactstrap_1.Col, { style: { minWidth: currentWidth, width: currentWidth, maxWidth: currentWidth }, key: appInfo.id + "-dash" },
                react_1.default.createElement(AppIconCon_1.AppIconCon, { package: appInfo, onClick: props.onClick, width: props.iconWidth, height: props.iconHeight })));
        }))));
};
exports.AppDashboard = AppDashboard;
