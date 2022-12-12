import { AppStatus } from "../utils/appStatus";
import { Notification } from "./notification";
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
    dependencies?: Array<any>;
    updates?: string;
    isRunning?: boolean;
    enabled?: boolean;
    isService?: boolean;
    isDependency?: boolean;
    launchUrl?: string;
    notificationContents?: Notification[];
    category?: 'system' | undefined | '';
    latestMinRuntime?: string;
}
export declare function isUpdatable(pkg: PackageInfo): boolean;
export declare function isUpdateCompat(pkg: PackageInfo): boolean;
export declare function isLaunchable(pkg: PackageInfo): boolean;
