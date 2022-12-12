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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useStoreHubStore from "./states/storehub";
import DashboardController from "./controllers/v2/AllViewDashboard";
import AppStyles from "./assets/css/app.module.css";
import { StoresController } from "./controllers/Stores";
import StoreDetailsController from "./controllers/StoreDetails";
import { AppInfoCon } from "./controllers/v2/AppInfoCon";
function App() {
    var storeHub = useStoreHubStore(function (state) { return state; });
    var _a = __read(useState(null), 2), selectedApp = _a[0], setSelectedApp = _a[1];
    React.useEffect(function () {
        storeHub.fetchStores();
        //eslint-disable-next-line
    }, []);
    var updateStatus = function (appInfo, node) {
        var notification = { content: "", type: "info" };
        if (appInfo.status === 'installed' && appInfo.enabled) {
            if (appInfo.isRunning === true && node.hasOwnProperty("servicesRunning")) {
                if (node.servicesRunning) {
                    notification = { type: "info", content: "Syncing" };
                }
                else {
                    notification = { type: "info", content: "Initializing" };
                }
            }
            else {
                if (appInfo.isRunning === true) {
                    notification = { type: "info", content: "Running" };
                }
                else {
                    notification = { type: "error", content: "Not running" };
                }
            }
        }
        return notification;
    };
    var onRestart = function () {
    };
    var onResync = function () {
    };
    var closeRestartModal = function () {
        //setRestartModal(false)
    };
    var closeResyncModal = function () {
    };
    var onBack = function () {
        setSelectedApp(null);
    };
    var handleAppStateChanged = function (appInfo) {
        var notification = updateStatus(appInfo, null);
        appInfo = __assign(__assign({}, appInfo), { notificationContents: [notification] });
        setSelectedApp(appInfo);
    };
    return (_jsxs("div", __assign({ className: AppStyles["App"] }, { children: [_jsx("header", { className: AppStyles["App-header"] }), _jsx(Router, { children: _jsxs(Routes, { children: [!selectedApp && _jsx(Route, { path: "/", element: _jsx(DashboardController, { onClick: setSelectedApp }) }), selectedApp &&
                            _jsx(Route, { path: "/", element: _jsx(AppInfoCon, { onRestart: onRestart, onResync: onResync, info: selectedApp, onBack: onBack, onAppStateChanged: handleAppStateChanged }) }), _jsx(Route, { path: "/stores", element: _jsx(StoresController, { stores: storeHub.list }) }), _jsx(Route, { path: "/store/:id", element: _jsx(StoreDetailsController, {}) })] }) })] })));
}
export default App;
