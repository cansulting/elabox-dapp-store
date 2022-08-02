/// <reference types="react" />
import { AppInfoAction } from './AppInfoSetting';
import { PackageInfo } from '../data/packageInfo';
export interface AppInfoProps {
    info: PackageInfo;
    style?: object;
    footer?: JSX.Element;
    customActions?: AppInfoAction[];
    isDependent?: boolean;
    onInstall?: (pkg: PackageInfo) => void;
    onCancel?: (pkg: PackageInfo) => void;
    onUninstall?: (pkg: PackageInfo) => void;
    onCheckIfDependent?: (pkg: PackageInfo) => void;
    onUpdate?: (pkg: PackageInfo) => void;
    onOff?: (pkg: PackageInfo) => Promise<string>;
    onOn?: (pkg: PackageInfo) => Promise<string>;
    onLaunch?: (pkg: PackageInfo) => void;
    onAppStateChanged?: (pkg: PackageInfo) => void;
    onResync?: () => void;
    onDisable?: () => void;
    onRestart?: () => void;
    onBack?: () => void;
    children?: any;
}
export declare const AppInfo: (props: AppInfoProps) => JSX.Element;
