import { useState } from "react"
import { SettingsProps } from "../../interfaces/Settings"
import SettingsStyle from "../assets/css/pages/settings.module.css"
import ButtonStyle from "../assets/css/button.module.css"
function SettingsPage(props: SettingsProps) : JSX.Element {
    const [hubName,setHubName] = useState("")
    const handleHubInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setHubName(event.target.value)
    }
    const handleHubFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.onAddHub(hubName)
        setHubName("")
    }
    return <div className={SettingsStyle['app-settings']}>
        <h1>Settings</h1>
        <div className={SettingsStyle['app-store-hubs']}>
            <h2>Store Hub</h2>
            {props.hubs.map(hub=>{
                return <div key={hub} className={SettingsStyle['app-store-hub']}>
                    <p>{hub}</p>
                </div>
            })}
            <form onSubmit={handleHubFormSubmit} className={`${SettingsStyle['app-store-hub-form']}`}>
                <input type="text" name="hub-input" value={hubName} onChange={handleHubInputChange}/>
                <button className={ButtonStyle['ghost']} type="submit">Add</button>
            </form>
        </div>
    </div>
}

export default SettingsPage