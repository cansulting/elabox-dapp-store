"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompatibleToSystem = exports.systemVersion = void 0;
var systeminfo = __importStar(require("/usr/ela/system/ela.system/info.json"));
var currentVersion;
function convertStringVerToValue(version) {
    var splits = version.split(".");
    var res = [];
    for (var _i = 0, splits_1 = splits; _i < splits_1.length; _i++) {
        var splitv = splits_1[_i];
        res.push(parseInt(splitv));
    }
    return res;
}
var systemVersion = function () {
    if (!currentVersion) {
        currentVersion = convertStringVerToValue(systeminfo.version);
    }
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
