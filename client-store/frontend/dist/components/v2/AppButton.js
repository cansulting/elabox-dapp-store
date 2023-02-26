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
import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Spinner } from 'react-bootstrap';
export var AppButton = function (props) {
    if (props.isProcessing) {
        return (_jsx(Button, __assign({}, props, { onClick: function (e) {
                e.preventDefault();
                props.onClick();
            } }, { children: _jsx(Spinner, { children: "", animation: 'border' }) })));
    }
    else {
        return (_jsx(Button, __assign({ style: { width: '80px', height: '35px' } }, props, { onClick: function (e) {
                e.preventDefault();
                props.onClick();
            } }, { children: props.children })));
    }
};
