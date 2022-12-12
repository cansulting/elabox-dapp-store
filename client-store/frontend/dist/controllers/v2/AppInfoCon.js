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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { AppInfo } from "../../components/v2/AppInfo";
import * as Listener from "../../api/store/broadcastListener";
import { useUtilState } from "../../states/toast";
import { installPackage, retrieveListing, cancelPackage, uninstallPackage, disablePackage, On, OnCheckStatus, OnCheckIfDependent } from '../../api/store/appLib';
import { useState } from "react";
var currentInfo = null;
export var AppInfoCon = function (props) {
    if (currentInfo === null || currentInfo.id !== props.info.id) {
        currentInfo = props.info;
    }
    var _a = __read(useState(currentInfo), 2), info = _a[0], setInfo = _a[1];
    var _b = __read(useState(props.info.progress), 2), progress = _b[0], setProgress = _b[1];
    var _c = __read(useState(false), 2), dependent = _c[0], setDependent = _c[1];
    var addToast = useUtilState().addToast;
    function updateInfo(pkg) {
        currentInfo = __assign(__assign({}, currentInfo), pkg);
        setInfo(currentInfo);
        if (props.onAppStateChanged)
            props.onAppStateChanged(currentInfo);
    }
    var handleLaunch = function (pkg) {
        // open the package on new tab
        var url = "http://" + window.location.hostname + pkg.launchUrl;
        //console.log(window.location)
        window.open(url, "_blank");
    };
    var handleInstall = function (pkg) {
        installPackage(pkg.id);
    };
    var handleCheckIfDpendency = function (pkg) {
        OnCheckIfDependent(pkg.id).then(function (isDependent) {
            setDependent(isDependent);
        });
    };
    var handleUninstall = function (pkg) {
        uninstallPackage(pkg.id);
    };
    var handleCancel = function (pkg) {
        cancelPackage(pkg.id);
    };
    var handleRefresh = function (toastMessage) {
        retrieveListing(info.id).then(function (listing) {
            var lastStatus = currentInfo.status;
            updateInfo(listing);
            setProgress(0);
            console.log(listing.status, lastStatus);
            // only display toast
            if (listing.status === "uninstalled" &&
                lastStatus !== "installed")
                return;
            addToast(toastMessage, "", "success");
        });
    };
    var handleDisable = function (pkg) {
        return new Promise(function (resolve, _) {
            disablePackage(pkg.id).then(function (_) {
                updateInfo({ isRunning: false, enabled: false });
                addToast("".concat(pkg.name, " was disabled"), "", "success");
            }).finally(function () {
                resolve("service changed");
            });
        });
    };
    var handleEnable = function (pkg) {
        return new Promise(function (resolve, _) {
            On(pkg.id).then(function (_) {
                updateInfo({ isRunning: true, enabled: true });
                addToast("".concat(pkg.name, " was enabled"), "", "success");
            }).finally(function () {
                resolve("service changed");
            });
        });
    };
    var handleCheckStatus = function () {
        OnCheckStatus(info.id).then(function (isRunning) {
            updateInfo({ isRunning: isRunning });
        });
    };
    var handleStateChanged = function (args) {
        var newInfo = { status: args.status };
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                newInfo.isRunning = true;
                handleRefresh("".concat(info.name, " was ").concat(args.status));
                break;
            case "uninstalled":
            case "updated":
                handleRefresh("".concat(info.name, " was ").concat(args.status));
                break;
            default:
                setProgress(0);
                break;
        }
        updateInfo(newInfo);
    };
    var handleProgress = function (args) {
        setProgress(args.progress);
    };
    var handleError = function (args) {
        var _a;
        if (((_a = currentInfo.notificationContents) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            updateInfo({
                notificationContents: currentInfo.notificationContents
            });
        }
        else {
            updateInfo({
                notificationContents: [{
                        type: "error", content: "CODE" + args.code + ": " + args.error
                    }]
            });
        }
    };
    useEffect(function () {
        retrieveListing(props.info.id).then(function (pkg) { return __awaiter(void 0, void 0, void 0, function () {
            var updatedInfo, updatedDepedencies, _a, _b, pkgId, app, e_1_1;
            var e_1, _c;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        updatedInfo = __assign(__assign({}, info), pkg);
                        updatedDepedencies = [];
                        if (!(((_d = updatedInfo.dependencies) === null || _d === void 0 ? void 0 : _d.length) > 0)) return [3 /*break*/, 8];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _a = __values(updatedInfo.dependencies), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        pkgId = _b.value;
                        return [4 /*yield*/, retrieveListing(pkgId)];
                    case 3:
                        app = _e.sent();
                        updatedDepedencies.push(app);
                        _e.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        updatedInfo.dependencies = updatedDepedencies;
                        // console.log(updatedInfo)
                        updateInfo(updatedInfo);
                        handleCheckStatus();
                        return [2 /*return*/];
                }
            });
        }); });
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
    var params = __assign(__assign({}, props), { info: __assign(__assign({}, info), { progress: progress }), onInstall: handleInstall, onUninstall: handleUninstall, onCheckIfDependent: handleCheckIfDpendency, isDependent: dependent, onCancel: handleCancel, onUpdate: handleInstall, onLaunch: handleLaunch, onOff: handleDisable, onOn: handleEnable });
    return _jsx(AppInfo, __assign({}, params));
};
