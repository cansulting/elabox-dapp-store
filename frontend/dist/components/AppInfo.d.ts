/// <reference types="react" />
interface PacakgeDetails {
    id: string;
    version: string;
    build: string;
}
interface Info {
    id: number;
    label: string;
    iconImg: string;
    isInstallable?: boolean;
    isUpdatable?: boolean;
    isLaunchable?: boolean;
    isService: boolean;
    percent?: 0;
    stats?: [any];
    body: JSX.Element;
    footer?: JSX.Element;
    package: PacakgeDetails;
    processStatus?: 'error' | 'completed' | 'downloading' | 'installing' | 'uninstalling' | 'syncing';
}
export interface AppInfoProps {
    info: Info;
    style: object;
    onInstall: () => void;
    onUninstall: () => void;
    onUpdate: () => void;
    onLaunch: () => void;
    onResync: () => void;
    onDisable: () => void;
    onRestart: () => void;
    onBack: () => void;
}
export declare const AppInfo: (props: AppInfoProps) => JSX.Element;
export {};
