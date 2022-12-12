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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllListings } from "../api/store";
import DashboardPage from "./pages/Dashboard";
export default function DasbhoardController(props) {
    var navigate = useNavigate();
    var onExploreClick = function () {
        navigate("/stores");
    };
    var onStoreClick = function (pkg) {
        navigate("/store/".concat(pkg.id));
    };
    var _a = __read(useState(null), 2), pkgs = _a[0], setPkgs = _a[1];
    //const { search } = useLocation()
    useEffect(function () {
        if (!pkgs) {
            retrieveAllListings(true)
                .then(function (res) {
                setPkgs(res);
            })
                .catch(function (err) { return console.log(err); });
        }
    });
    return _jsx(DashboardPage, { apps: pkgs, onExploreClick: onExploreClick, onSelected: onStoreClick });
}
