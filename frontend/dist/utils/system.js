"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompatibleToSystem = exports.systemVersion = void 0;
var actions_1 = require("../actions");
var constants_1 = require("../actions/constants");
var currentVersion = [];
(0, constants_1.getEventHandler)().waitUntilConnected(5000)
    .then(function (_) { return __awaiter(void 0, void 0, void 0, function () {
    var ver;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, actions_1.retrieveSystemVersion)()];
            case 1:
                ver = _a.sent();
                currentVersion = convertStringVerToValue(ver);
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (err) {
    console.log("Failed retrieving version", err);
});
function convertStringVerToValue(version) {
    var e_1, _a;
    var splits = version.split(".");
    var res = [];
    try {
        for (var splits_1 = __values(splits), splits_1_1 = splits_1.next(); !splits_1_1.done; splits_1_1 = splits_1.next()) {
            var splitv = splits_1_1.value;
            res.push(parseInt(splitv));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (splits_1_1 && !splits_1_1.done && (_a = splits_1.return)) _a.call(splits_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
var systemVersion = function () {
    return currentVersion;
};
exports.systemVersion = systemVersion;
// use to check if the version is compatible to system version
var isCompatibleToSystem = function (version) {
    if (!version || version === "")
        return true;
    var converted = convertStringVerToValue(version);
    var sysver = (0, exports.systemVersion)();
    for (var i = 0; i < sysver.length; i++) {
        //console.log(converted[i] + " " + sysver[i])
        // check if the system is outdated
        if (sysver[i] < converted[i])
            return false;
    }
    return true;
};
exports.isCompatibleToSystem = isCompatibleToSystem;
