import { Component, ReactNode, useEffect } from "react"
import { useState } from "react"
import HiveConnect from "../hive/hiveConnect"
import { HIVE_CONFIG } from "../constants"
import Auth from "../hive/auth"
import Dashboard from "../pages/Dashboard"
import { SIGNEDIN, SIGNEDOUT, SIGNING, useStoreState } from "../states/store"
import { useUtilState } from "../states/utils"
import ToastCon from "../components/ToastContainer"

// const SIGNEDIN = "signedin"
// const SIGNEDOUT = "signedout"
// const SIGNING = "signing"



function Home(props: any) {
    const { initialize, info, authStatus, setAuthStatus} = useStoreState()
    const { toasts } = useUtilState()
    const onPressSign = () => {
        setAuthStatus(SIGNING)
        Auth.signin(HIVE_CONFIG.appId).then( (presentation) => {
            // if (presentation) {
            //     HiveConnect.initialize(HIVE_CONFIG)
            //     updateStatus( SIGNEDIN)
            // } else {
            //     updateStatus(SIGNEDOUT)
            // }
            initialize()
            // .then( _con => {
            //     let _status = _con ? SIGNEDIN : SIGNEDOUT
            //     setAuthStatus(_status)
            //     console.log("DDDDD", _con)
            // })
        }).catch( err => {
            console.error(err)
            setAuthStatus(SIGNEDOUT)
        })
    }
    
    useEffect(() => {
        setAuthStatus(SIGNING)
        initialize()
    }, [])
    //console.log(authStatus, info)
    return (<div>
        <ToastCon toasts={toasts}/>
        { authStatus === SIGNEDIN && <Dashboard storeData={info}  />}
        { authStatus === SIGNEDOUT && <button onClick={_ => onPressSign() }>Sign-in</button>}
    </div>)
}

export default Home