import { AppStatus } from "../utils/appStatus";
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
}
export declare function isUpdatable(pkg: PackageInfo): boolean;
export declare function isLaunchable(pkg: PackageInfo): boolean;
