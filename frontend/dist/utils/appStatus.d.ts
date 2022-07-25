export declare type AppStatus = 'error' | 'installed' | 'uninstalled' | 'downloaded' | 'downloading' | 'installing' | 'uninstalling' | 'syncing' | 'wait_depends';
export declare const AppStatusToCaption: (status: AppStatus) => "" | "Downloading" | "Installing" | "Uninstalling" | "Syncing" | "Error" | "Installed" | "Installing Dependencies" | "Downloaded" | "Uninstalled";
