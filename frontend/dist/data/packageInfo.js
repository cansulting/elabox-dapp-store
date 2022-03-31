"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLaunchable = exports.isUpdatable = void 0;
function isUpdatable(pkg) {
    if (pkg.status !== "installed")
        return false;
    return pkg.latestBuild > pkg.currentBuild;
}
exports.isUpdatable = isUpdatable;
function isLaunchable(pkg) {
    return pkg.status === "installed";
}
exports.isLaunchable = isLaunchable;
