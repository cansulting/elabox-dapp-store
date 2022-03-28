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
exports.AppIcon = void 0;
var react_1 = __importDefault(require("react"));
var Icon = __importStar(require("react-feather"));
var reactstrap_1 = require("reactstrap");
var colors_1 = require("../utils/colors");
var AppIcon = function (props) {
    var _a;
    var progressColor = (0, colors_1.ProgressColor)(props.processStatus);
    return (react_1.default.createElement("div", { className: props.className, style: {
            width: props.width,
            height: props.height,
            textAlign: 'center',
        } },
        react_1.default.createElement("div", { style: {
                position: 'relative',
                marginBottom: 10,
            } },
            react_1.default.createElement("img", { src: props.iconImg, alt: props.label, style: { width: '100%', height: '100%', borderRadius: 10 } }),
            props.notification > 0 && (react_1.default.createElement(Icon.Bell, { style: {
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    border: '1px solid lightgrey',
                    borderRadius: '50%',
                    background: 'red',
                    padding: 5,
                    cursor: 'pointer',
                }, color: "white", height: 20, width: 20 })),
            props.isInstallable && (react_1.default.createElement(Icon.Download, { style: {
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    border: '1px solid lightgrey',
                    borderRadius: '50%',
                    background: 'blue',
                    padding: 5,
                    cursor: 'pointer',
                }, color: "white", height: 20, width: 20 }))),
        !props.iconOnly && ((_a = props.processStatus) === null || _a === void 0 ? void 0 : _a.length) > 0 && (react_1.default.createElement(reactstrap_1.Progress, { value: props.percent, color: progressColor, animated: props.processStatus === 'downloading' ||
                props.processStatus === 'uninstalling' ||
                props.processStatus === 'installing'
                ? true
                : false })),
        !props.iconOnly && !props.processStatus && react_1.default.createElement("h4", null, props.label)));
};
exports.AppIcon = AppIcon;
