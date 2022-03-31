import { PackageInfo } from "../data/packageInfo";
export declare function retrieveAllListings(): Promise<PackageInfo[]>;
export declare function retrieveListing(packageId: string): Promise<PackageInfo>;
export declare function installPackage(packageId: string): Promise<void>;
export declare function uninstallPackage(packageId: string): Promise<void>;
