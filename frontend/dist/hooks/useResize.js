"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useResize = function (element) {
    var _a = (0, react_1.useState)(0), width = _a[0], setWidth = _a[1];
    var _b = (0, react_1.useState)(0), height = _b[0], setHeight = _b[1];
    (0, react_1.useEffect)(function () {
        setWidth(element === null || element === void 0 ? void 0 : element.current.offsetWidth);
        setHeight(element === null || element === void 0 ? void 0 : element.current.offsetHeight);
        window.addEventListener("resize", function () {
            setWidth(element === null || element === void 0 ? void 0 : element.current.offsetWidth);
            setHeight(element === null || element === void 0 ? void 0 : element.current.offsetHeight);
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
