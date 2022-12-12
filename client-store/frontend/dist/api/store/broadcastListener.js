import { getEventHandler, INSTALLER_ID, PACKAGE_ID, INSTALLER_ERROR, INSTALLER_PROGRESS, INSTALLER_STATE_CHANGED, } from "../../constants";
import EventEmitter from "events";
var eventEmitter = new EventEmitter();
var isInit = false;
export var init = function () {
    if (isInit)
        return;
    isInit = true;
    getEventHandler().subscribe(INSTALLER_ID, function (res) {
        console.log(INSTALLER_ID, res);
    });
    getEventHandler().subscribe(PACKAGE_ID, function (res) {
        console.log(PACKAGE_ID, res);
    });
    getEventHandler().on(INSTALLER_STATE_CHANGED, function (args) {
        //console.log(INSTALLER_STATE_CHANGED, args)
        var data = JSON.parse(args.data);
        emitForPackage(data.packageId, "install_state_changed", data);
    });
    getEventHandler().on(INSTALLER_PROGRESS, function (args) {
        //console.log(INSTALLER_PROGRESS, args)
        var data = JSON.parse(args.data);
        emitForPackage(data.packageId, "install_progress", data);
    });
    getEventHandler().on(INSTALLER_ERROR(INSTALLER_ID), function (args) {
        var data = JSON.parse(args.data);
        emitForPackage(data.packageId, "install_error", data);
    });
    getEventHandler().on(INSTALLER_ERROR(PACKAGE_ID), function (args) {
        var data = JSON.parse(args.data);
        emitForPackage(data.packageId, "install_error", data);
    });
};
export var on = function (action, callback) {
    init();
    eventEmitter.on(action, callback);
};
export var off = function (action, callback) {
    eventEmitter.off(action, callback);
};
export var onPackage = function (packageId, action, callback) {
    var acstr = action;
    on(packageId + "." + acstr, callback);
};
export var offPackage = function (packageId, action, callback) {
    var acstr = action;
    off(packageId + "." + acstr, callback);
};
export var emitForPackage = function (packageId, action, callback) {
    emit(packageId + "." + action, callback);
};
export var emit = function (action, val) {
    eventEmitter.emit(action, val);
};
