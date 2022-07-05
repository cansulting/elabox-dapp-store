import React from "react"
import { useEffect, useState } from "react"
import { AppDashboardProps, PackageInfo } from ".."
import { retrieveAllListings } from "../actions"
import { AppDashboard } from "../components"
import { useSearchParams } from "react-router-dom"

export const AppDashboardCon = (props: AppDashboardProps): JSX.Element => {
    const [searchParam, _]  = useSearchParams()
    const [pkgs, setPkgs] = useState([])
    useEffect( () => {
        if (!pkgs || pkgs.length === 0){
            const beta = searchParam.get("beta")
            let showBeta = false
            if (beta) {
                showBeta = beta === 'true' || beta === '1'
            }
            retrieveAllListings(showBeta)
            .then( res => {
                setPkgs(res)
            })
            .catch( err => console.log(err))
        }
    })

    const params = { ... props, apps: pkgs}
    return  <AppDashboard {...params}/>
}