import React from "react"
import { useEffect, useState } from "react"
import { AppDashboardProps } from "../../components/v2/AppDashboard"
import { retrieveAllListings } from "../../api/store"
import { AppDashboard } from "../../components/v2"
//import { useLocation } from "react-router-dom"

const AllViewDashboard = (props: AppDashboardProps): JSX.Element => {
    const [pkgs, setPkgs] = useState([])
    //const { search } = useLocation()
    useEffect( () => {
        if (!pkgs || pkgs.length === 0){
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

export default AllViewDashboard