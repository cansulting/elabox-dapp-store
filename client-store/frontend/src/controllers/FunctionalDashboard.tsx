import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllListings } from "../api/store";
import { PackageInfo } from "../data/packageInfo";
import DashboardPage from "./pages/Dashboard";

export interface DashboardControllerProps{
}

export default function DasbhoardController(props:DashboardControllerProps){
    const navigate = useNavigate()
    const onExploreClick= () =>{
        navigate("/stores")
    }
    const onStoreClick= (pkg: PackageInfo) =>{
        navigate(`/store/${pkg.id}`)
    }
    const [pkgs, setPkgs] = useState(null as PackageInfo[])
    //const { search } = useLocation()
    useEffect( () => {
        if (!pkgs){
            retrieveAllListings(true)
            .then( res => {
                setPkgs(res)
            })
            .catch( err => console.log(err))
        }
    })
    return <DashboardPage apps={pkgs} onExploreClick={onExploreClick} onSelected={onStoreClick}/>
}