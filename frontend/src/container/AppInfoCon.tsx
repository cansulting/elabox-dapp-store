import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { AppInfoProps, AppInfo } from "../components/AppInfo"
import * as Listener from "../actions/broadcastListener"
import { 
    installPackage,
    retrieveListing, 
    cancelPackage, 
    uninstallPackage ,
    disablePackage,
    On,
    OnCheckStatus
} from '../actions/appLib'
import { useState } from "react"
import { PackageInfo } from "../data/packageInfo"

let currentInfo : any = null

export const AppInfoCon = (props: AppInfoProps): JSX.Element => {
    if (currentInfo === null || currentInfo.id !== props.info.id)
        currentInfo = props.info

    const [info, setInfo] = useState(currentInfo)
    const [progress, setProgress] = useState(props.info.progress)
    const updateInfo = (pkg: PackageInfo) => {
        setInfo(pkg)
        currentInfo = pkg
        if (props.onAppStateChanged)
            props.onAppStateChanged(pkg)
        //console.log("*******", pkg)
    }
    const handleLaunch = (pkg: PackageInfo) => {
        // open the package on new tab
        const url = "http://" + window.location.hostname +  pkg.launchUrl
        //console.log(window.location)
        window.open(url, "_blank")
    }
    const handleInstall = (pkg:PackageInfo) => {
        installPackage(pkg.id)
    }
    const handleUninstall = (pkg:PackageInfo) => {
        uninstallPackage(pkg.id)
    }
    const handleCancel = (pkg:PackageInfo) => {
        cancelPackage(pkg.id)
    }    
    const handleRefresh = (toastMessage: string) => {
        retrieveListing(info.id).then(listing => {
            updateInfo({...info,...listing})
            setProgress(0)
            toast.success(toastMessage)            
        })
    }
    const handleDisable = (pkg:PackageInfo) => {
        return new Promise<string>((resolve,_) => {
            disablePackage(pkg.id).then(_ => {
                handleCheckStatus(pkg)
                toast.success(`${pkg.name} is disabled`)                            
            }).finally(()=>{
                resolve("service changed")
            })            
        })

    }
    const handleEnable = (pkg:PackageInfo) => {
        return new Promise<string>((resolve,_) => {
            On(pkg.id).then(_ => {
                handleCheckStatus(pkg)
                toast.success(`${pkg.name} is enabled`)                            
            }).finally(()=>{
                resolve("service changed")
            })
        })

    }    
    const handleCheckStatus = (pkg: PackageInfo) =>{
        OnCheckStatus(pkg.id).then(isRunning =>{
            updateInfo({...info,isRunning: isRunning === "true"})
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
            case "uninstalled":
            case "updated":
            case "enabled":
            case "disabled":
                handleRefresh(`${info.name} is ${args.status}`)
                break
            default:
                setProgress(0)
                break;
        }
        updateInfo( {...currentInfo, status:args.status}) 
        //console.log(currentInfo)
    }
    const handleProgress = (args:any) => {
        setProgress( args.progress)
    }
    const handleError = (args:any) => {
        updateInfo( {
            ...info,
            notificationContents:[{
                type:"error",content: "CODE" + args.code + ": " + args.error
            }]
        })
    }
    useEffect(() => {
        console.log("init")
        retrieveListing(props.info.id).then(async pkg => {
            const updatedInfo = {...info,...pkg}
            const updatedDepedencies: PackageInfo[] = []
            if(updatedInfo.dependencies?.length > 0){
                for( const pkgId of updatedInfo.dependencies){
                    const app =  await retrieveListing(pkgId)
                    if(app.status !=="installed" && app.status !=="uninstalling"){
                     updatedDepedencies.push(app)               
                    }
                 }
            }
            updatedInfo.dependencies = updatedDepedencies
            updateInfo(updatedInfo)
            handleCheckStatus(updatedInfo)
        })
        Listener.onPackage(props.info.id, "install_progress", handleProgress)
        Listener.onPackage(props.info.id, "install_state_changed", handleStateChanged)
        Listener.onPackage(props.info.id,"install_error", handleError)        
        // clean up listener
        return function cleanup() {
            //console.log("cleanup")
            Listener.offPackage(props.info.id, "install_progress", handleProgress)
            Listener.offPackage(props.info.id, "install_state_changed", handleStateChanged)
            Listener.offPackage(props.info.id,"install_error", handleError)           
        }
    }, [props.info.id]);
    const params = {
        ...props, 
        info:{...info, progress: progress},
        onInstall: handleInstall,
        onUninstall: handleUninstall,
        onCancel: handleCancel,
        onUpdate: handleInstall,
        onLaunch: handleLaunch,
        onOff: handleDisable,
        onOn: handleEnable,
        onCheckStatus: handleCheckStatus
    }
    return <AppInfo {...params}/>
}