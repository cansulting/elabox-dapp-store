"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppIcon = void 0;
var react_1 = __importStar(require("react"));
var Icon = __importStar(require("react-feather"));
var reactstrap_1 = require("reactstrap");
var colors_1 = require("../utils/colors");
var packageInfo_1 = require("../data/packageInfo");
var AppIcon = function (props) {
    var _a = __read((0, react_1.useState)(false), 2), onHover = _a[0], setOnHover = _a[1];
    var handleOnHover = function (isHover) {
        setOnHover(isHover);
    };
    var pkg = props.package;
    var status = pkg.status;
    var progressColor = (0, colors_1.ProgressColor)(status);
    //console.log("icon", pkg)
    return (react_1.default.createElement("div", { className: props.className, style: {
            // width: props.width,
            // height: props.height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: 'center',
            cursor: "pointer",
            backgroundColor: "#272A3D",
            opacity: onHover ? 0.8 : 1,
            borderRadius: 10,
            marginBottom: 10,
            height: props.height + 50
        }, onClick: function (ev) { return props.onClick(props.package); }, onMouseEnter: function () { return handleOnHover(true); }, onMouseLeave: function () { return handleOnHover(false); } },
        react_1.default.createElement("div", { style: {
                position: 'relative',
                marginBottom: 10,
                width: props.width,
                height: props.height,
                padding: 10
            } },
            react_1.default.createElement("img", { src: props.package.icon, alt: props.package.name, style: {
                    width: '100%', height: '100%',
                    borderRadius: 10
                } }),
            props.package.notifications > 0 && (react_1.default.createElement(Icon.Bell, { style: {
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    border: '1px solid lightgrey',
                    borderRadius: '50%',
                    background: 'red',
                    padding: 5,
                    cursor: 'pointer',
                }, color: "white", height: 20, width: 20 })),
            (pkg.progress <= 0 && (0, packageInfo_1.isUpdatable)(pkg)) && (0, packageInfo_1.isUpdateCompat)(pkg) &&
                (react_1.default.createElement(Icon.RefreshCw, { style: {
                        position: 'absolute',
                        bottom: '3%',
                        right: '3%',
                        borderRadius: '50%',
                        background: '#0081ff',
                        padding: '3%',
                    }, color: "white", height: "20%", width: "20%" })),
            (pkg.status === "uninstalled" && pkg.progress === 0) &&
                (react_1.default.createElement(Icon.Download, { style: {
                        position: 'absolute',
                        bottom: '3%',
                        right: '3%',
                        borderRadius: '50%',
                        background: '#0081ff',
                        padding: '3%',
                    }, color: "white", height: "20%", width: "20%" })),
            props.package.progress > 0 && (react_1.default.createElement(reactstrap_1.Progress, { style: { height: "6px", width: "100%", margin: "10px 0" }, value: props.package.progress, color: progressColor }))),
        (!props.package.progress || props.package.progress <= 0) && react_1.default.createElement("h4", null, props.package.name)));
};
exports.AppIcon = AppIcon;
