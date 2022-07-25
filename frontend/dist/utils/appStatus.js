"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStatusToCaption = void 0;
var AppStatusToCaption = function (status) {
    switch (status) {
        case "downloading":
            return "Downloading";
        case "installing":
            return "Installing";
        case "uninstalling":
            return "Uninstalling";
        case "syncing":
            return "Syncing";
        case "error":
            return "Error";
        case "installed":
            return "Installed";
        case "wait_depends":
            return "Installing Dependencies";
        case "downloaded":
            return "Downloaded";
        case "uninstalled":
            return "Uninstalled";
        default:
            return "";
    }
};
exports.AppStatusToCaption = AppStatusToCaption;
