import { EboxEvent } from "elabox-foundation";

let _eventHandler : EboxEvent | null = null;

const HOST = /*"192.168.118.25"//*/window.location.hostname 
export const IPFS_PEERS = ['http://192.168.118.25:5003','https://ipfs.infura.io:5001/api/v0']

export const PACKAGE_ID = "ela.store";
export const INSTALLER_ID = "ela.installer"
export const PKGMGR_ID = "ela.pkgmgr" // package manager id

// action id
export const AC_RETRIEVE_PKGS = "ela.store.actions.RETRIEVE_PACKAGES";
export const AC_RETRIEVE_PKG = "ela.store.actions.RETRIEVE_PACKAGE";
export const AC_INSTALL_PKG = "ela.store.actions.INSTALL_PACKAGE";
export const AC_UNINSTALL_PKG = "ela.store.actions.UNINSTALL_PACKAGE";
export const AC_CANCEL_PKG = "ela.store.actions.CANCEL_INSTALL_PACKAGE";
export const AC_CHECK_IF_PACKAGE_IS_DEPENDENCY = "ela.store.actions.CHECK_IF_PACKAGE_IS_DEPENDENCY"
export const AC_RETRIEVE_SYSTEM_VERSION = "ela.store.actions.RETRIEVE_SYSTEM_VERSION";
export const AC_RESTART = "ela.system.APP_RESTART";
export const AC_OFF = "ela.system.APP_OFF"
export const AC_ON = "ela.system.APP_ON"
export const AC_CHECK_STATUS = "ela.system.APP_CHECK_STATUS";
export const AC_CLEAR_DATA = "ela.system.APP_CLEAR_DATA";

// installer broadcasts
export const INSTALLER_PROGRESS = PKGMGR_ID + ".broadcast.INSTALL_PROGRESS"
export const INSTALLER_STATE_CHANGED = PKGMGR_ID + ".broadcast.INSTALL_STATE"
export const INSTALLER_ERROR = (pgkId:string) => pgkId + ".broadcast.ERROR"

export const setEventHandler = (eh: EboxEvent) => { 
    _eventHandler = eh;
}

export const getEventHandler = () => {
    if (!_eventHandler) {
        _eventHandler = new EboxEvent("http://" + HOST)
    }
    return _eventHandler;
}