import * as systeminfo from "/usr/ela/system/ela.system/info.json"

let currentVersion : number[]

function convertStringVerToValue(version:string): number[] {
    let splits = version.split(".")
    const res = []
    for (const splitv of splits) {
        res.push( parseInt(splitv))
    }
    return res
}

export const systemVersion = () : number[] => {
    if (!currentVersion) {
        currentVersion = convertStringVerToValue( systeminfo.version)
    }
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