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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import create from "zustand";
import { devtools } from "zustand/middleware";
var toast_timeout = 6000;
export var useUtilState = create()(devtools(function (set, get) { return ({
    toasts: [],
    addToast: function (msg, title, type) {
        var ntoasts = __spreadArray([], __read(get().toasts), false);
        ntoasts.push({ msg: msg, title: title, type: type });
        set(function (_) { return ({ toasts: ntoasts }); });
        setTimeout(function () {
            console.log("TIMEOUT");
            var nToasts = get().toasts;
            nToasts.shift();
            set(function (_) { return ({ toasts: nToasts }); });
        }, toast_timeout);
    },
    removeToast: function (msg) {
        var nToasts = get().toasts;
        var i = nToasts.findIndex(function (v, index) {
            return v.msg === msg;
        });
        if (i < 0)
            return;
        nToasts = nToasts.slice(i);
        //console.log("found", i, nToasts)
        set(function (_) { return ({ toasts: nToasts }); });
    }
}); }));
