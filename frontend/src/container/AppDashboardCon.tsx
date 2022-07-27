import React from "react"
import { useEffect, useState } from "react"
import { AppDashboardProps } from ".."
import { retrieveAllListings } from "../actions"
import { AppDashboard } from "../components"
//import { useLocation } from "react-router-dom"

export const AppDashboardCon = (props: AppDashboardProps): JSX.Element => {
    const [pkgs, setPkgs] = useState([])
    //const { search } = useLocation()
    useEffect( () => {
        if (!pkgs || pkgs.length === 0){
            //const urlS = new URLSearchParams(search)
            //const beta  = urlS.get("beta")
            // let showBeta = false
            // if (beta) {
            //     showBeta = beta === 'true' || beta === '1'
            // }
            retrieveAllListings(true)
            .then( res => {
                setPkgs(res)
            })
            .catch( err => console.log(err))
        }
    })
    const params = { ... props, apps: pkgs}
    return  <AppDashboard {...params}/>
}