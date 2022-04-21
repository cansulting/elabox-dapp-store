import { AppStatus } from "../utils/appStatus";
import { MessagePrompt } from "./messagePrompt";
export interface PackageInfo {
    id: string;
    name: string;
    icon: string;
    currentBuild: number;
    latestBuild: number;
    status: AppStatus;
    progress?: number;
    version?: string;
    notifications?: number;
    description?: string;
    updates?: string;
    isService?: boolean;
    launchUrl?: string;
    notificationContents?: MessagePrompt[];
    category?: 'system' | undefined | '';
    latestMinRuntime?: string;
}
export declare function isUpdatable(pkg: PackageInfo): boolean;
export declare function isUpdateCompat(pkg: PackageInfo): boolean;
export declare function isLaunchable(pkg: PackageInfo): boolean;
