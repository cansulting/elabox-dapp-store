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
import { useState } from "react";
import SettingsStyle from "../assets/css/pages/settings.module.css";
import ButtonStyle from "../assets/css/button.module.css";
function SettingsPage(props) {
    var _a = __read(useState(""), 2), hubName = _a[0], setHubName = _a[1];
    var handleHubInputChange = function (event) {
        event.preventDefault();
        setHubName(event.target.value);
    };
    var handleHubFormSubmit = function (event) {
        event.preventDefault();
        props.onAddHub(hubName);
        setHubName("");
    };
    return _jsxs("div", __assign({ className: SettingsStyle['app-settings'] }, { children: [_jsx("h1", { children: "Settings" }), _jsxs("div", __assign({ className: SettingsStyle['app-store-hubs'] }, { children: [_jsx("h2", { children: "Store Hub" }), props.hubs.map(function (hub) {
                        return _jsx("div", __assign({ className: SettingsStyle['app-store-hub'] }, { children: _jsx("p", { children: hub }) }), hub);
                    }), _jsxs("form", __assign({ onSubmit: handleHubFormSubmit, className: "".concat(SettingsStyle['app-store-hub-form']) }, { children: [_jsx("input", { type: "text", name: "hub-input", value: hubName, onChange: handleHubInputChange }), _jsx("button", __assign({ className: ButtonStyle['ghost'], type: "submit" }, { children: "Add" }))] }))] }))] }));
}
export default SettingsPage;
