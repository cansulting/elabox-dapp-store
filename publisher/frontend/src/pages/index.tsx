import { Component, ReactNode, useEffect } from "react"
import { useState } from "react"
import HiveConnect from "../hive/hiveConnect"
import { HIVE_CONFIG } from "../constants"
import Auth from "../hive/auth"
import Dashboard from "../pages/Dashboard"
import { useStoreState } from "../states/store"

const SIGNEDIN = "signedin"
const SIGNEDOUT = "signedout"
const SIGNING = "signing"

function Home(props: any) {
    const status = useStoreState((state) => state.authStatus)
    const updateStatus = useStoreState( state => state.setAuthStatus)
    const onPressSign = () => {
        updateStatus(SIGNING)
        Auth.signin(HIVE_CONFIG.appId).then( (presentation) => {
            if (presentation) {
                HiveConnect.initialize(HIVE_CONFIG)
                updateStatus( SIGNEDIN)
            } else {
                updateStatus(SIGNEDOUT)
            }
        }).catch( err => {
            console.error(err)
            updateStatus(SIGNEDOUT)
        })
    }
    useEffect(() => {
        console.log("checking")
        updateStatus(SIGNING)
        Auth.isConnected(HIVE_CONFIG.appId).then( async _con => {
            let _status = _con ? SIGNEDIN : SIGNEDOUT
            if (status !== _status) {
                if (_con)
                    await HiveConnect.initialize(HIVE_CONFIG)
                updateStatus(_status)
            }
        })
    }, [])
    console.log(status)
    return (<div>
        { status === SIGNEDIN && <Dashboard header={undefined} sidebar={undefined} body={undefined} />}
        { status === SIGNEDOUT && <button onClick={_ => onPressSign() }>Sign-in</button>}
    </div>)
}

export default Home