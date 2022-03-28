export interface AppIconProps {
    className?: string;
    label: string;
    iconImg: string;
    width: string;
    height: string;
    percent?: number;
    iconOnly?: boolean;
    isInstallable?: boolean;
    notification?: number;
    processStatus?: 'error' | 'completed' | 'downloading' | 'installing' | 'uninstalling' | 'syncing';
}
export declare const AppIcon: (props: AppIconProps) => JSX.Element;
