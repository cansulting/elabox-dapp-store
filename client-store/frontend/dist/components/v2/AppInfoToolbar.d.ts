/// <reference types="react" />
import { PackageInfo } from '../../data/packageInfo';
export interface AppInfoAction {
    label: string;
    color?: string;
    onClick?: (pkg: PackageInfo) => void;
}
export interface AppInfoToolbarProps {
    info: PackageInfo;
    onCheckIfDependent: Function;
    isDependent: boolean;
    onUnInstall?: Function;
    onUpdate?: Function;
    onResync?: Function;
    onDisable?: Function;
    onRestart?: Function;
    onLaunch?: Function;
    onInstall?: Function;
    onOn?: () => Promise<string>;
    onOff?: () => Promise<string>;
}
export declare const AppInfoToolbar: (props: AppInfoToolbarProps) => JSX.Element;
