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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDashboardCon = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var actions_1 = require("../actions");
var components_1 = require("../components");
//import { useLocation } from "react-router-dom"
var AppDashboardCon = function (props) {
    var _a = __read((0, react_2.useState)([]), 2), pkgs = _a[0], setPkgs = _a[1];
    //const { search } = useLocation()
    (0, react_2.useEffect)(function () {
        if (!pkgs || pkgs.length === 0) {
            //const urlS = new URLSearchParams(search)
            //const beta  = urlS.get("beta")
            // let showBeta = false
            // if (beta) {
            //     showBeta = beta === 'true' || beta === '1'
            // }
            (0, actions_1.retrieveAllListings)(true)
                .then(function (res) {
                setPkgs(res);
            })
                .catch(function (err) { return console.log(err); });
        }
    });
    var params = __assign(__assign({}, props), { apps: pkgs });
    return react_1.default.createElement(components_1.AppDashboard, __assign({}, params));
};
exports.AppDashboardCon = AppDashboardCon;
