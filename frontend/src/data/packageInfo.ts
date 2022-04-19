import { AppStatus } from "../utils/appStatus"
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
} 

export function isUpdatable(pkg:PackageInfo) : boolean {
	if (pkg.status !== "installed") return false
    return pkg.latestBuild > pkg.currentBuild
}

export function isLaunchable(pkg:PackageInfo) : boolean {
    return pkg.status === "installed"
}