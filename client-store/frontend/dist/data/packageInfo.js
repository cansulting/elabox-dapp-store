import { isCompatibleToSystem } from "../utils/system";
// use to test if updatable
export function isUpdatable(pkg) {
    if (pkg.status !== "installed")
        return false;
    if (pkg.latestBuild <= pkg.currentBuild)
        return false;
    return true;
}
// if theres an update - this can be use to check if the update is system compatible
export function isUpdateCompat(pkg) {
    if (pkg.latestMinRuntime === "")
        return true;
    return isCompatibleToSystem(pkg.latestMinRuntime);
}
export function isLaunchable(pkg) {
    if (pkg.status !== "installed")
        return false;
    if (pkg.isService && !pkg.enabled)
        return false;
    if (pkg.launchUrl && pkg.launchUrl !== "")
        return true;
    return !pkg.isService;
}
