export type AppStatus = 
| 'error'
| 'installed'
| 'uninstalled'
| 'downloaded'
| 'downloading'
| 'installing'
| 'uninstalling'
| 'syncing'
| 'wait_depends'

export const AppStatusToCaption = (status : AppStatus) => {
    switch (status) {
        case "downloading":
            return "Downloading"
        case "installing":
            return "Installing"
        case "uninstalling":
            return "Uninstalling"
        case "syncing":
            return "Syncing"
        case "error":
            return "Error"
        case "installed":
            return "Installed"
        case "wait_depends":
            return "Installing Dependencies"
        case "downloaded":
            return "Downloaded"
        case "uninstalled":
            return "Uninstalled"    
        default:
            return ""
    }
}