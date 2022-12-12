import { EboxEvent } from "elabox-foundation";
var _eventHandler = null;
var HOST = /*"192.168.118.25"//*/ window.location.hostname;
export var IPFS_PEERS = ['http://192.168.118.25:5003', 'https://ipfs.infura.io:5001/api/v0'];
export var PACKAGE_ID = "ela.store";
export var INSTALLER_ID = "ela.installer";
export var PKGMGR_ID = "ela.pkgmgr"; // package manager id
// action id
export var AC_RETRIEVE_PKGS = "ela.store.actions.RETRIEVE_PACKAGES";
export var AC_RETRIEVE_PKG = "ela.store.actions.RETRIEVE_PACKAGE";
export var AC_INSTALL_PKG = "ela.store.actions.INSTALL_PACKAGE";
export var AC_UNINSTALL_PKG = "ela.store.actions.UNINSTALL_PACKAGE";
export var AC_CANCEL_PKG = "ela.store.actions.CANCEL_INSTALL_PACKAGE";
export var AC_CHECK_IF_PACKAGE_IS_DEPENDENCY = "ela.store.actions.CHECK_IF_PACKAGE_IS_DEPENDENCY";
export var AC_RETRIEVE_SYSTEM_VERSION = "ela.store.actions.RETRIEVE_SYSTEM_VERSION";
export var AC_RESTART = "ela.system.APP_RESTART";
export var AC_OFF = "ela.system.APP_OFF";
export var AC_ON = "ela.system.APP_ON";
export var AC_CHECK_STATUS = "ela.system.APP_CHECK_STATUS";
export var AC_CLEAR_DATA = "ela.system.APP_CLEAR_DATA";
// installer broadcasts
export var INSTALLER_PROGRESS = PKGMGR_ID + ".broadcast.INSTALL_PROGRESS";
export var INSTALLER_STATE_CHANGED = PKGMGR_ID + ".broadcast.INSTALL_STATE";
export var INSTALLER_ERROR = function (pgkId) { return pgkId + ".broadcast.ERROR"; };
export var setEventHandler = function (eh) {
    _eventHandler = eh;
};
export var getEventHandler = function () {
    if (!_eventHandler) {
        _eventHandler = new EboxEvent("http://" + HOST);
    }
    return _eventHandler;
};
