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
    OnCheckStatus,
    OnCheckIfDependency
} from '../actions/appLib'
import { useState } from "react"
import { PackageInfo } from "../data/packageInfo"

let currentInfo : any = null

export const AppInfoCon = (props: AppInfoProps): JSX.Element => {
    if (currentInfo === null || currentInfo.id !== props.info.id) {
        currentInfo = props.info
    }

    const [info, setInfo] = useState(currentInfo)
    const [progress, setProgress] = useState(props.info.progress)
    function updateInfo(pkg: any) {
        currentInfo = {...currentInfo, ...pkg}
        setInfo(currentInfo)
        if (props.onAppStateChanged)
            props.onAppStateChanged(currentInfo)
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
    const handleCheckIfDpendency = (pkg:PackageInfo) =>{
        OnCheckIfDependency(pkg.id).then(isDependency => {
            setInfo({...info,isDependency})
        })
    }
    const handleUninstall = (pkg:PackageInfo) => {
        uninstallPackage(pkg.id)
    }
    const handleCancel = (pkg:PackageInfo) => {
        cancelPackage(pkg.id)
    }    
    const handleRefresh = (toastMessage: string) => {
        retrieveListing(info.id).then(listing => {
            updateInfo(listing)
            setProgress(0)
            toast.success(toastMessage)            
        })
    }
    const handleDisable = (pkg:PackageInfo) => {
        return new Promise<string>((resolve,_) => {
            disablePackage(pkg.id).then(_ => {
                updateInfo({isRunning:false})
                toast.success(`${pkg.name} was disabled`)                            
            }).finally(()=>{
                resolve("service changed")
            })            
        })

    }
    const handleEnable = (pkg:PackageInfo) => {
        return new Promise<string>((resolve,_) => {
            On(pkg.id).then(_ => {
                updateInfo({isRunning:true})
                toast.success(`${pkg.name} was enabled`)                            
            }).finally(()=>{
                resolve("service changed")
            })
        })

    }    
    const handleCheckStatus = () =>{
        OnCheckStatus(info.id).then(isRunning =>{
            updateInfo({isRunning: isRunning})
        })

    }
    const handleStateChanged = (args:any) => {
        const newInfo : any = {status:args.status}
        switch (args.status) {
            case "downloading":
            case "downloaded":
            case "syncing":
            case "installing":
                break;
            case "installed":
                newInfo.isRunning = true
            case "uninstalled":
            case "updated":
                handleRefresh(`${info.name} was ${args.status}`)
                break
            default:
                setProgress(0)
                break;
        }
        updateInfo( newInfo) 
    }
    const handleProgress = (args:any) => {
        setProgress( args.progress)
    }
    const handleError = (args:any) => {
        updateInfo( {
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
            handleCheckStatus()
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
        onCheckIfDependency: handleCheckIfDpendency,
        onCancel: handleCancel,
        onUpdate: handleInstall,
        onLaunch: handleLaunch,
        onOff: handleDisable,
        onOn: handleEnable
    }
    return <AppInfo {...params}/>
}