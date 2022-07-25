"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useResize = function (element) {
    var _a = __read((0, react_1.useState)(0), 2), width = _a[0], setWidth = _a[1];
    var _b = __read((0, react_1.useState)(0), 2), height = _b[0], setHeight = _b[1];
    (0, react_1.useEffect)(function () {
        var _a, _b;
        setWidth((_a = element === null || element === void 0 ? void 0 : element.current) === null || _a === void 0 ? void 0 : _a.offsetWidth);
        setHeight((_b = element === null || element === void 0 ? void 0 : element.current) === null || _b === void 0 ? void 0 : _b.offsetHeight);
        window.addEventListener("resize", function () {
            var _a, _b;
            setWidth((_a = element === null || element === void 0 ? void 0 : element.current) === null || _a === void 0 ? void 0 : _a.offsetWidth);
            setHeight((_b = element === null || element === void 0 ? void 0 : element.current) === null || _b === void 0 ? void 0 : _b.offsetHeight);
        });
        return function () {
            window.removeEventListener("resize", function () {
                setWidth(0);
                setHeight(0);
            });
        };
    }, []);
    return { width: width, height: height };
};
exports.default = useResize;
