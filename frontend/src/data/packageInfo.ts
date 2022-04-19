import { AppStatus } from "../utils/appStatus"
import { isCompatibleToSystem, systemVersion } from "../utils/system"
import { MessagePrompt } from "./messagePrompt"

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
	launchUrl?: string
	notificationContents?: MessagePrompt[]
	category?: 'system' | undefined | ''
	latestMinRuntime?: string // the required package to install this package
} 

// use to test if updatable
export function isUpdatable(pkg:PackageInfo) : boolean {
	if (pkg.status !== "installed") return false
    if (pkg.latestBuild <= pkg.currentBuild) return false
	return true
}

// if theres an update - this can be use to check if the update is system compatible
export function isUpdateCompat(pkg:PackageInfo): boolean {
	if (pkg.latestMinRuntime === "") return true
	return isCompatibleToSystem(pkg.latestMinRuntime)
}

export function isLaunchable(pkg:PackageInfo) : boolean {
    return pkg.status === "installed"
}