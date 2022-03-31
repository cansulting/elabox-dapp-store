import React from "react"
import { useEffect, useState } from "react"
import { AppDashboardProps, PackageInfo } from ".."
import { retrieveAllListings } from "../actions"
import { AppDashboard } from "../components"

export const AppDashboardCon = (props: AppDashboardProps): JSX.Element => {
    //let defaultv = [] as PackageInfo[]
    const [pkgs, setPkgs] = useState([])
    useEffect( () => {
        if (!pkgs || pkgs.length === 0){
            retrieveAllListings()
            .then( res => {
                setPkgs(res)
            })
            .catch( err => console.log(err))
        }
    })
    const params = { ... props, apps: pkgs}
    return  <AppDashboard {...params}/>
}