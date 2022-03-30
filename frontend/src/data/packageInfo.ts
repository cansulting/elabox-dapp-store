import { AppStatus } from "../utils/appStatus"

export interface PackageInfo {
    id :           string
	name:         string
	icon :        string
	currentBuild : number
	latestBuild : number
	status: AppStatus
	progress?: number
    version?: string
	notifications?: number
	description? : string 
    updates? : string
    isService?: boolean
    stats?: [any]
}

export function isUpdatable(pkg:PackageInfo) : boolean {
	if (pkg.status !== "installed") return false
    return pkg.latestBuild > pkg.currentBuild
}

export function isLaunchable(pkg:PackageInfo) : boolean {
    return pkg.status === "installed"
}