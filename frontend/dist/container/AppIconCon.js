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
exports.AppIconCon = void 0;
var react_1 = __importStar(require("react"));
var AppIcon_1 = require("../components/AppIcon");
var Listener = __importStar(require("../actions/broadcastListener"));
var AppIconCon = function (props) {
    var _a = __read((0, react_1.useState)(props.package), 2), info = _a[0], setInfo = _a[1];
    var _b = __read((0, react_1.useState)(props.package.progress), 2), progress = _b[0], setProgress = _b[1];
    var handleProgress = function (args) {
        setProgress(args.progress);
    };
    var handleStateChanged = function (args) {
        //console.log(info, args.status)
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                setProgress(0);
                // set the build as updated
                setInfo(__assign(__assign({}, info), { status: args.status, currentBuild: info.latestBuild }));
                return;
            default:
                setProgress(0);
                break;
        }
        setInfo(__assign(__assign({}, info), { status: args.status }));
    };
    (0, react_1.useEffect)(function () {
        //console.log("init")
        Listener.onPackage(props.package.id, "install_progress", handleProgress);
        Listener.onPackage(props.package.id, "install_state_changed", handleStateChanged);
        // clean up listener
        return function cleanup() {
            //console.log("cleanup")
            Listener.offPackage(props.package.id, "install_progress", handleProgress);
            Listener.offPackage(props.package.id, "install_state_changed", handleStateChanged);
        };
    }, [props.package.id]);
    var params = __assign(__assign({}, props), { package: __assign(__assign({}, info), { progress: progress }) });
    return react_1.default.createElement(AppIcon_1.AppIcon, __assign({}, params));
};
exports.AppIconCon = AppIconCon;
