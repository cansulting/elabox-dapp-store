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
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AppIcon } from "../../components/v2/AppIcon";
import * as Listener from "../../api/store/broadcastListener";
export var AppIconCon = function (props) {
    var _a = __read(useState(props.package), 2), info = _a[0], setInfo = _a[1];
    var _b = __read(useState(props.package.progress), 2), progress = _b[0], setProgress = _b[1];
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
    useEffect(function () {
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
    return _jsx(AppIcon, __assign({}, params));
};
