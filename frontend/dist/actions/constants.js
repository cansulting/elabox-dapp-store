"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AC_INSTALL_PKG = exports.AC_RETRIEVE_PKG = exports.AC_RETRIEVE_PKGS = exports.PACKAGE_ID = exports.eventHandler = void 0;
var elabox_foundation_1 = require("elabox-foundation");
exports.eventHandler = new elabox_foundation_1.EboxEvent("http://localhost");
exports.PACKAGE_ID = "ela.store";
// action id
exports.AC_RETRIEVE_PKGS = "ela.store.actions.RETRIEVE_PACKAGES";
exports.AC_RETRIEVE_PKG = "ela.store.actions.RETRIEVE_PACKAGE";
exports.AC_INSTALL_PKG = "ela.store.actions.INSTALL_PACKAGE";
