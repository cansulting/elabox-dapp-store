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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var actions_1 = require("../actions");
var components_1 = require("../components");
var AppDashboardCon = function (props) {
    //let defaultv = [] as PackageInfo[]
    var _a = (0, react_2.useState)([]), pkgs = _a[0], setPkgs = _a[1];
    (0, react_2.useEffect)(function () {
        if (!pkgs || pkgs.length === 0) {
            (0, actions_1.retrieveAllListings)()
                .then(function (res) {
                setPkgs(res);
            })
                .catch(function (err) { return console.log(err); });
        }
    });
    var params = __assign(__assign({}, props), { apps: pkgs });
    return react_1.default.createElement(components_1.AppDashboard, __assign({}, params));
};
exports.default = AppDashboardCon;
