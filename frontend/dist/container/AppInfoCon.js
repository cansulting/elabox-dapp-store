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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoCon = void 0;
var react_1 = __importStar(require("react"));
var AppInfo_1 = require("../components/AppInfo");
var Listener = __importStar(require("../actions/broadcastListener"));
var appLib_1 = require("../actions/appLib");
var react_2 = require("react");
var currentInfo = null;
var AppInfoCon = function (props) {
    if (currentInfo === null || currentInfo.id !== props.info.id)
        currentInfo = props.info;
    var _a = (0, react_2.useState)(currentInfo), info = _a[0], setInfo = _a[1];
    var _b = (0, react_2.useState)(props.info.progress), progress = _b[0], setProgress = _b[1];
    var updateInfo = function (pkg) {
        setInfo(pkg);
        currentInfo = pkg;
        //console.log("*******", pkg)
    };
    var handleLaunch = function (pkg) {
        // open the package on new tab
        var url = "http://" + window.location.hostname + pkg.launchUrl;
        //console.log(window.location)
        window.open(url, "_blank");
    };
    var handleInstall = function (pkg) {
        (0, appLib_1.installPackage)(pkg.id);
    };
    var handleUninstall = function (pkg) {
        (0, appLib_1.uninstallPackage)(pkg.id);
    };
    var handleRefresh = function () {
        (0, appLib_1.retrieveListing)(info.id).then(function (listing) {
            updateInfo(__assign(__assign({}, info), listing));
            setProgress(0);
        });
    };
    var handleStateChanged = function (args) {
        //props.info.status = args.status
        //console.log(info, args.status)
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                handleRefresh();
                break;
            default:
                setProgress(0);
                break;
        }
        updateInfo(__assign(__assign({}, currentInfo), { status: args.status }));
        //console.log(currentInfo)
    };
    var handleProgress = function (args) {
        setProgress(args.progress);
    };
    var handleError = function (args) {
        updateInfo(__assign(__assign({}, info), { notificationContents: [{
                    type: "error", content: "CODE" + args.code + ": " + args.error
                }] }));
    };
    (0, react_1.useEffect)(function () {
        console.log("init");
        (0, appLib_1.retrieveListing)(props.info.id).then(function (pkg) {
            updateInfo(__assign(__assign({}, info), pkg));
        });
        Listener.onPackage(props.info.id, "install_progress", handleProgress);
        Listener.onPackage(props.info.id, "install_state_changed", handleStateChanged);
        Listener.onPackage(props.info.id, "install_error", handleError);
        // clean up listener
        return function cleanup() {
            //console.log("cleanup")
            Listener.offPackage(props.info.id, "install_progress", handleProgress);
            Listener.offPackage(props.info.id, "install_state_changed", handleStateChanged);
            Listener.offPackage(props.info.id, "install_error", handleError);
        };
    }, [props.info.id]);
    var params = __assign(__assign({}, props), { info: __assign(__assign({}, info), { progress: progress }), onInstall: handleInstall, onUninstall: handleUninstall, onUpdate: handleInstall, onLaunch: handleLaunch });
    return react_1.default.createElement(AppInfo_1.AppInfo, __assign({}, params));
};
exports.AppInfoCon = AppInfoCon;
