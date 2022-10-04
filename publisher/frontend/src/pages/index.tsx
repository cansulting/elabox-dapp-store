import { useState } from "react"
import Auth from "../hive/auth"

function Home() : JSX.Element{
    const [connected, setConnected] = useState(false) 
    Auth.isConnected()
        .then( _connected => setConnected(_connected))
    return (<div>

    </div>)
}

export default Home