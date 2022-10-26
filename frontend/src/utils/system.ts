import { retrieveSystemVersion } from "../actions"
import { getEventHandler } from "../actions/constants"

let currentVersion : number[] = []

getEventHandler().waitUntilConnected(5000)
    .then( async _ => {
        const ver = await retrieveSystemVersion()
        currentVersion = convertStringVerToValue( ver)
    })
    .catch( err => {
        console.log("Failed retrieving version", err)
    })

function convertStringVerToValue(version:string): number[] {
    let splits = version.split(".")
    const res = []
    for (const splitv of splits) {
        res.push( parseInt(splitv))
    }
    return res
}

// current system version
export const systemVersion = () : number[] => {
    return currentVersion
}

// use to check if the version is compatible to system version
export const isCompatibleToSystem = (version: string) : boolean => {
    if (!version || version === "" ) return true
    const converted = convertStringVerToValue(version)
    const sysver = systemVersion()
    for (let i=0; i < sysver.length; i ++) {
        //console.log(converted[i] + " " + sysver[i])
        // check if the system is outdated
        if (sysver[i] < converted[i] )
            return false
    }
    return true
}