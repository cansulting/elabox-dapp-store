/// <reference types="react" />
import { AppInfoAction } from './AppInfoSetting';
import { PackageInfo } from '../data/packageInfo';
export interface AppInfoProps {
    info: PackageInfo;
    style?: object;
    footer?: JSX.Element;
    customActions?: AppInfoAction[];
    onInstall?: (pkg: PackageInfo) => void;
    onUninstall?: (pkg: PackageInfo) => void;
    onUpdate?: (pkg: PackageInfo) => void;
    onLaunch?: (pkg: PackageInfo) => void;
    onAppStateChanged?: (pkg: PackageInfo) => void;
    onResync?: () => void;
    onDisable?: () => void;
    onRestart?: () => void;
    onBack?: () => void;
    children?: any;
}
export declare const AppInfo: (props: AppInfoProps) => JSX.Element;
