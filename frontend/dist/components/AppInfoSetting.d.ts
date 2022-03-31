import { PackageInfo } from '../data/packageInfo';
export interface AppInfoAction {
    label: string;
    color?: string;
    onClick?: (pkg: PackageInfo) => void;
}
export interface AppInfoSettingProps {
    info: PackageInfo;
    isService: boolean;
    customActions?: AppInfoAction[];
    onUnInstall?: Function;
    onResync?: Function;
    onDisable?: Function;
    onRestart?: Function;
}
export declare const AppInfoSetting: (props: AppInfoSettingProps) => JSX.Element;
