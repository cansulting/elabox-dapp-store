import React, { useEffect } from "react"
import { AppInfoProps, AppInfo } from "../components/AppInfo"
import * as Listener from "../actions/broadcastListener"
import { 
    installPackage,
    retrieveListing, 
    uninstallPackage } from '../actions/appLib'
import { useState } from "react"
import { PackageInfo } from "../data/packageInfo"

export const AppInfoCon = (props: AppInfoProps): JSX.Element => {
    const [info, setInfo] = useState(props.info)
    const [progress, setProgress] = useState(props.info.progress)
    
    const handleLaunch = (pkg: PackageInfo) => {
        // open the package on new tab
        const url = window.location.protocol + "//" + window.location.hostname +  pkg.launchUrl
        //console.log(window.location)
        window.open(url, "_blank")
    }
    const handleInstall = (pkg:PackageInfo) => {
        installPackage(pkg.id).catch(error=>{
            handleError({error:error.message})
        })
    }
    const handleUninstall = (pkg:PackageInfo) => {
        uninstallPackage(pkg.id).catch(error=>{
            handleError({error:error.message})
        })
    }
    const handleRefresh = () => {
        retrieveListing(info.id).then( listing => {
            setInfo(listing)
            setProgress(0)
        }).catch(error=>{
            handleError({error:error.message})
        })
    }
    const handleStateChanged = (args:any) => {
        //props.info.status = args.status
        //console.log(info, args.status)
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                handleRefresh()
                break;
            default:
                setProgress(0)
                break;
        }
        setInfo( {...info, status:args.status}) 
    }
    const handleProgress = (args:any) => {
        setProgress( args.progress)
    }
    const handleError = (args:any) => {
        setInfo( {...info,notificationContents:[{type:"error",content:args.error}]})
    }
    useEffect(() => {
        console.log("init")
        retrieveListing(props.info.id).then( pkg => {
            setInfo({...pkg,...props.info})
        })
        Listener.onPackage(props.info.id, "install_progress", handleProgress)
        Listener.onPackage(props.info.id, "install_state_changed", handleStateChanged)
        Listener.onPackage(props.info.id,"install_error", handleError)        
        // clean up listener
        return function cleanup() {
            console.log("cleanup")
            Listener.offPackage(props.info.id, "install_progress", handleProgress)
            Listener.offPackage(props.info.id, "install_state_changed", handleProgress)
            Listener.offPackage(props.info.id,"install_error", handleError)           
        }
    }, [props.info.id]);
    const params = {
        ...props, 
        info:{...info, progress: progress},
        onInstall: handleInstall,
        onUninstall: handleUninstall,
        onUpdate: handleInstall,
        onLaunch: handleLaunch,
    }
    return <AppInfo {...params}/>
}