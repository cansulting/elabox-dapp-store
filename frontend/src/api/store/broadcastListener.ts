
import { 
    getEventHandler, 
    INSTALLER_ID, 
    PACKAGE_ID,
    INSTALLER_ERROR,
    INSTALLER_PROGRESS,
    INSTALLER_STATE_CHANGED,
 } from "../../constants"
import EventEmitter from "events"

const eventEmitter = new EventEmitter()
let isInit = false

export type BroadcastType = 
    "install_progress" | 
    "install_state_changed" |
    "install_error" 

export const init = () => {
    if (isInit) return;
    isInit = true
    getEventHandler().subscribe(INSTALLER_ID, (res) => {
        console.log(INSTALLER_ID, res)
    })
    getEventHandler().subscribe(PACKAGE_ID, res => {
        console.log(PACKAGE_ID, res)
    })
    getEventHandler().on(INSTALLER_STATE_CHANGED, (args) => {
        //console.log(INSTALLER_STATE_CHANGED, args)
        const data = JSON.parse(args.data)
        emitForPackage(data.packageId, "install_state_changed", data)
    })
    getEventHandler().on(INSTALLER_PROGRESS, (args) => {
        //console.log(INSTALLER_PROGRESS, args)
        const data = JSON.parse(args.data)
        emitForPackage(data.packageId,"install_progress", data)
    })
    getEventHandler().on(INSTALLER_ERROR(INSTALLER_ID),args => {
        const data = JSON.parse(args.data)
        emitForPackage(data.packageId,"install_error", data)
    })
    getEventHandler().on(INSTALLER_ERROR(PACKAGE_ID), args => {
        const data = JSON.parse(args.data)
        emitForPackage(data.packageId,"install_error", data)
    })
}

export const on = (action : string, callback: (args:any) => void) => {
    init()
    eventEmitter.on(action, callback)
} 

export const off = (action: string, callback: (args: any) => void) => {
    eventEmitter.off(action, callback)
}

export const onPackage = (packageId: string, action: BroadcastType, callback: (args: any) => void) => {
    let acstr = action as string
    on(packageId + "." + acstr, callback)
}

export const offPackage = (packageId: string, action: BroadcastType, callback: (args: any) => void) => {
    let acstr = action as string
    off(packageId + "." + acstr, callback)
}

export const emitForPackage = (packageId: string, action : BroadcastType, callback: (args: any) => void) => {
    emit(packageId + "." + (action as string), callback)
}

export const emit = (action : string, val: any) => {
    eventEmitter.emit(action, val)
}