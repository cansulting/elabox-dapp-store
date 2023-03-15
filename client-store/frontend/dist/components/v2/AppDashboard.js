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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AppIconCon } from '../../controllers/v2/AppIconCon';
import useResize from "../../hooks/useResize";
var DefaultStyle = {
    width: "100%",
    backgroundColor: "transparent",
    //padding:20
};
var currentWidth = 0;
export var AppDashboard = function (props) {
    var parentDiv = useRef(null);
    var parentWidth = useResize(parentDiv).width;
    var _a = props.iconWidth, iconWidth = _a === void 0 ? 100 : _a, _b = props.iconHeight, iconHeight = _b === void 0 ? 100 : _b, _c = props.style, style = _c === void 0 ? DefaultStyle : _c;
    var iconWidthWithPadding = iconWidth + 20;
    var columnPerRow = Math.round(parentWidth / iconWidthWithPadding);
    var columnWidth = Math.round(parentWidth / columnPerRow) + 1;
    currentWidth = !isNaN(columnWidth) ? columnWidth : 0;
    if (props.apps === null) {
        return _jsx(_Fragment, {});
    }
    return (_jsx("div", __assign({ style: style, ref: parentDiv }, { children: _jsx(Row, __assign({ className: "gx-2", xs: columnPerRow }, { children: props.apps.map(function (appInfo) {
                return (_jsx(Col, __assign({ style: { minWidth: currentWidth, width: currentWidth, maxWidth: currentWidth } }, { children: _jsx(AppIconCon, { package: appInfo, onClick: props.onClick, width: iconWidth, height: iconHeight }) }), appInfo.id + "-dash"));
            }) })) })));
};
