import React, { useEffect, useState } from "react";
import { AppIcon, AppIconProps } from "../components/AppIcon";
import * as Listener from "../actions/broadcastListener"

export const AppIconCon = (props: AppIconProps): JSX.Element => {
    const [info, setInfo] = useState(props.package)
    const [progress, setProgress] = useState(props.package.progress)
    const handleProgress = (args:any) => {
        setProgress( args.progress)
    }
    const handleStateChanged = (args: any) => {
        //console.log(info, args.status)
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                setProgress(0)
                // set the build as updated
                setInfo({...info, status: args.status, currentBuild: info.latestBuild})
                return;
            default:
                setProgress(0)
                break;
        }
        setInfo({...info, status:args.status}) 
    }

    useEffect(() => {
        //console.log("init")
        Listener.onPackage(props.package.id, "install_progress", handleProgress)
        Listener.onPackage(props.package.id, "install_state_changed", handleStateChanged)
        // clean up listener
        return function cleanup() {
            //console.log("cleanup")
            Listener.offPackage(props.package.id, "install_progress", handleProgress)
            Listener.offPackage(props.package.id, "install_state_changed", handleStateChanged)
        }
    }, [props.package.id]);
    const params = {
        ...props, 
        package:{...info, progress: progress},
    }
    return <AppIcon {...params} />
}