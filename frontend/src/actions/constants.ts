import { EboxEvent } from "elabox-foundation";

const HOST = "192.168.118.25"//window.location.hostname 
export const eventHandler = new EboxEvent("http://" + HOST);
export const PACKAGE_ID = "ela.store";
export const INSTALLER_ID = "ela.installer"

// action id
export const AC_RETRIEVE_PKGS = "ela.store.actions.RETRIEVE_PACKAGES";
export const AC_RETRIEVE_PKG = "ela.store.actions.RETRIEVE_PACKAGE";
export const AC_INSTALL_PKG = "ela.store.actions.INSTALL_PACKAGE";
export const AC_UNINSTALL_PKG = "ela.store.actions.UNINSTALL_PACKAGE";

// installer broadcasts
export const INSTALLER_PROGRESS = PACKAGE_ID + ".broadcast.INSTALL_PROGRESS"
export const INSTALLER_STATE_CHANGED = PACKAGE_ID + ".broadcast.INSTALL_STATE"
export const INSTALLER_ERROR = PACKAGE_ID + ".broadcast.ERROR"