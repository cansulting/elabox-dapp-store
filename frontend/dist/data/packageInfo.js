"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLaunchable = exports.isUpdateCompat = exports.isUpdatable = void 0;
var system_1 = require("../utils/system");
// use to test if updatable
function isUpdatable(pkg) {
    if (pkg.status !== "installed")
        return false;
    if (pkg.latestBuild <= pkg.currentBuild)
        return false;
    return true;
}
exports.isUpdatable = isUpdatable;
// if theres an update - this can be use to check if the update is system compatible
function isUpdateCompat(pkg) {
    if (pkg.latestMinRuntime === "")
        return true;
    return (0, system_1.isCompatibleToSystem)(pkg.latestMinRuntime);
}
exports.isUpdateCompat = isUpdateCompat;
function isLaunchable(pkg) {
    if (pkg.status !== "installed" || !pkg.isRunning)
        return false;
    if (pkg.launchUrl && pkg.launchUrl !== "")
        return true;
    return !pkg.isService;
}
exports.isLaunchable = isLaunchable;
