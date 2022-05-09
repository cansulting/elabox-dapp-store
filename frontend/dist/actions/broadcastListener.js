"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = exports.emitForPackage = exports.offPackage = exports.onPackage = exports.off = exports.on = exports.init = void 0;
var constants_1 = require("./constants");
var events_1 = __importDefault(require("events"));
var eventEmitter = new events_1.default();
var isInit = false;
var init = function () {
    if (isInit)
        return;
    isInit = true;
    // eventHandler.subscribe(INSTALLER_ID, (res) => {
    //     console.log(INSTALLER_ID, res)
    // })
    (0, constants_1.getEventHandler)().subscribe(constants_1.PACKAGE_ID, function (res) {
        console.log(constants_1.PACKAGE_ID, res);
    });
    (0, constants_1.getEventHandler)().on(constants_1.INSTALLER_STATE_CHANGED, function (args) {
        //console.log(INSTALLER_STATE_CHANGED, args)
        var data = JSON.parse(args.data);
        (0, exports.emitForPackage)(data.packageId, "install_state_changed", data);
    });
    (0, constants_1.getEventHandler)().on(constants_1.INSTALLER_PROGRESS, function (args) {
        //console.log(INSTALLER_PROGRESS, args)
        var data = JSON.parse(args.data);
        (0, exports.emitForPackage)(data.packageId, "install_progress", data);
    });
    (0, constants_1.getEventHandler)().on(constants_1.INSTALLER_ERROR, function (args) {
        console.log(constants_1.INSTALLER_ERROR, args);
        var data = JSON.parse(args.data);
        (0, exports.emitForPackage)(data.packageId, "install_error", data);
    });
};
exports.init = init;
var on = function (action, callback) {
    (0, exports.init)();
    eventEmitter.on(action, callback);
};
exports.on = on;
var off = function (action, callback) {
    eventEmitter.off(action, callback);
};
exports.off = off;
var onPackage = function (packageId, action, callback) {
    var acstr = action;
    (0, exports.on)(packageId + "." + acstr, callback);
};
exports.onPackage = onPackage;
var offPackage = function (packageId, action, callback) {
    var acstr = action;
    (0, exports.off)(packageId + "." + acstr, callback);
};
exports.offPackage = offPackage;
var emitForPackage = function (packageId, action, callback) {
    (0, exports.emit)(packageId + "." + action, callback);
};
exports.emitForPackage = emitForPackage;
var emit = function (action, val) {
    eventEmitter.emit(action, val);
};
exports.emit = emit;
