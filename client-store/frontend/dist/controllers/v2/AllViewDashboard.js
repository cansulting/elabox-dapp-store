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
import { retrieveAllListings } from "../../api/store";
import { AppDashboard } from "../../components/v2";
//import { useLocation } from "react-router-dom"
var AllViewDashboard = function (props) {
    var _a = __read(useState([]), 2), pkgs = _a[0], setPkgs = _a[1];
    //const { search } = useLocation()
    useEffect(function () {
        if (!pkgs || pkgs.length === 0) {
            retrieveAllListings(true)
                .then(function (res) {
                setPkgs(res);
            })
                .catch(function (err) { return console.log(err); });
        }
    });
    var params = __assign(__assign({}, props), { apps: pkgs });
    return _jsx(AppDashboard, __assign({}, params));
};
export default AllViewDashboard;
