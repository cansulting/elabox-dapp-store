"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventHandler = exports.setEventHandler = exports.INSTALLER_ERROR = exports.INSTALLER_STATE_CHANGED = exports.INSTALLER_PROGRESS = exports.AC_RESYNC = exports.AC_CHECK_STATUS = exports.AC_ON = exports.AC_OFF = exports.AC_RESTART = exports.AC_RETRIEVE_SYSTEM_VERSION = exports.AC_CHECK_IF_PACKAGE_IS_DEPENDENCY = exports.AC_CANCEL_PKG = exports.AC_UNINSTALL_PKG = exports.AC_INSTALL_PKG = exports.AC_RETRIEVE_PKG = exports.AC_RETRIEVE_PKGS = exports.INSTALLER_ID = exports.PACKAGE_ID = void 0;
var elabox_foundation_1 = require("elabox-foundation");
var _eventHandler = null;
var HOST = /*"192.168.118.25"//*/ window.location.hostname;
exports.PACKAGE_ID = "ela.store";
exports.INSTALLER_ID = "ela.installer";
// action id
exports.AC_RETRIEVE_PKGS = "ela.store.actions.RETRIEVE_PACKAGES";
exports.AC_RETRIEVE_PKG = "ela.store.actions.RETRIEVE_PACKAGE";
exports.AC_INSTALL_PKG = "ela.store.actions.INSTALL_PACKAGE";
exports.AC_UNINSTALL_PKG = "ela.store.actions.UNINSTALL_PACKAGE";
exports.AC_CANCEL_PKG = "ela.store.actions.CANCEL_INSTALL_PACKAGE";
exports.AC_CHECK_IF_PACKAGE_IS_DEPENDENCY = "ela.store.actions.CHECK_IF_PACKAGE_IS_DEPENDENCY";
exports.AC_RETRIEVE_SYSTEM_VERSION = "ela.store.actions.RETRIEVE_SYSTEM_VERSION";
exports.AC_RESTART = "ela.system.APP_RESTART";
exports.AC_OFF = "ela.system.APP_OFF";
exports.AC_ON = "ela.system.APP_ON";
exports.AC_CHECK_STATUS = "ela.system.APP_CHECK_STATUS";
exports.AC_RESYNC = "ela.system.APP_CLEAR_DATA";
// installer broadcasts
exports.INSTALLER_PROGRESS = exports.PACKAGE_ID + ".broadcast.INSTALL_PROGRESS";
exports.INSTALLER_STATE_CHANGED = exports.PACKAGE_ID + ".broadcast.INSTALL_STATE";
exports.INSTALLER_ERROR = exports.PACKAGE_ID + ".broadcast.ERROR";
var setEventHandler = function (eh) {
    _eventHandler = eh;
};
exports.setEventHandler = setEventHandler;
var getEventHandler = function () {
    if (!_eventHandler) {
        _eventHandler = new elabox_foundation_1.EboxEvent("http://" + HOST);
    }
    return _eventHandler;
};
exports.getEventHandler = getEventHandler;
