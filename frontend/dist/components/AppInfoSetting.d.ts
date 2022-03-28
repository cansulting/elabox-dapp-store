export interface AppInfoSettingProps {
    isService: boolean;
    onUnInstall?: Function;
    onResync?: Function;
    onDisable?: Function;
    onRestart?: Function;
}
export declare const AppInfoSetting: (props: AppInfoSettingProps) => JSX.Element;
