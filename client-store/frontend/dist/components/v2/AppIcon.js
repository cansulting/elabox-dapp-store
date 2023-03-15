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
import { useState } from 'react';
import * as Icon from 'react-feather';
import { ProgressColor } from '../../utils/colors';
import { isUpdatable, isUpdateCompat } from "../../data/packageInfo";
import { ProgressBar } from 'react-bootstrap';
import { MyImage } from '../ui/MyImage';
var DefaultStyle = function (props) {
    var hover = props.hover;
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'center',
        cursor: "pointer",
        backgroundColor: !hover ? "white" : "#ebebeb",
        opacity: hover ? 0.8 : 1,
        borderRadius: 10,
        marginBottom: 10,
        height: props.height + 50
    };
};
export var AppIcon = function (props) {
    var _a = __read(useState(false), 2), onHover = _a[0], setOnHover = _a[1];
    var handleOnHover = function (isHover) {
        setOnHover(isHover);
    };
    var pkg = props.package;
    var status = pkg.status;
    var progressColor = ProgressColor(status);
    var progress = pkg.progress;
    if (!(progress > 0) && pkg.status === "installing")
        progress = 95;
    var _style = __assign(__assign({}, DefaultStyle(__assign(__assign({}, props), { hover: onHover }))), props.style);
    return (_jsxs("div", __assign({ className: props.className, style: _style, onClick: function (ev) { return props.onClick(props.package); }, onMouseEnter: function () { return handleOnHover(true); }, onMouseLeave: function () { return handleOnHover(false); } }, { children: [_jsxs("div", __assign({ style: {
                    position: 'relative',
                    marginBottom: 10,
                    /*width: props.width,
                    height: props.height,*/
                    padding: 10
                } }, { children: [_jsx(MyImage, __assign({}, props.package)), props.package.notifications > 0 && (_jsx(Icon.Bell, { style: {
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            border: '1px solid lightgrey',
                            borderRadius: '50%',
                            background: 'red',
                            padding: 5,
                            cursor: 'pointer',
                        }, color: "white", height: 20, width: 20 })), (pkg.progress <= 0 && isUpdatable(pkg)) && isUpdateCompat(pkg) &&
                        (_jsx(Icon.RefreshCw, { style: {
                                position: 'absolute',
                                bottom: '3%',
                                right: '3%',
                                borderRadius: '50%',
                                background: '#0081ff',
                                padding: '3%',
                            }, color: "white", height: "20%", width: "20%" })), (pkg.status === "uninstalled" && pkg.progress === 0) &&
                        (_jsx(Icon.Download, { style: {
                                position: 'absolute',
                                bottom: '3%',
                                right: '3%',
                                borderRadius: '50%',
                                background: '#0081ff',
                                padding: '3%',
                            }, color: "white", height: "20%", width: "20%" }))] })), _jsxs("div", __assign({ style: {
                    position: 'relative',
                    marginBottom: 10,
                    width: "100%",
                    /*width: props.width,
                    height: props.height,*/
                    height: "20px",
                    padding: "0 10px"
                } }, { children: [(!progress || progress <= 0) &&
                        _jsx("h4", __assign({ style: { fontSize: "clamp(1rem, 1vw, 2rem)", fontWeight: "500" } }, { children: pkg.name })), progress > 0 && (_jsx(ProgressBar, { style: { height: "6px", margin: "8px 20px" }, now: progress, color: progressColor }))] }))] })));
};
