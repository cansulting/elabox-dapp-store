import React,{useState} from 'react'
import * as Icon from 'react-feather'
import Toggle from 'react-toggle'
import { PackageInfo } from '../data/packageInfo'

export interface AppInfoAction {
    label: string
    color?: string
    onClick?: (pkg: PackageInfo) => void
}

export interface AppInfoSettingProps {
    info: PackageInfo
    isService: boolean
    customActions?: AppInfoAction[]                 // custom actions that will be added as menu
    onUnInstall?: Function
    onResync?: Function
    onDisable?: Function
    onRestart?: Function
    onOff?: Function,
    onOn?: Function
}

export const AppInfoSetting = (props: AppInfoSettingProps): JSX.Element => {
    const [isServiceOn,setIsServiceOn] = useState(false)
    const handleServiceToggleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const willServiceOn = e.target.checked
        setIsServiceOn(willServiceOn)
        if(willServiceOn) {
            props.onOn()
            return
        }
        props.onOff()
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                gap: 5,
            }}
        >
            {props.info.status === "installed" && 
            <Toggle checked={isServiceOn} icons={{
                checked: <Icon.Power style={{display:"block",paddingBottom:3}} size={15} color="white"/>,
                unchecked: <Icon.Circle style={{display:"block",paddingBottom:3}} size={15} color="white"/>
            }} onChange={handleServiceToggleChange}/> }                        
            {props.isService && 
                <>
                    <span
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onResync()
                        }}
                    >
                        Resync
                    </span>
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onRestart()
                        }}
                    >
                        Restart
                    </span>
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onDisable()
                        }}
                    >
                        Disable
                    </span>
                </>
            }
            {props.info.category !== 'system' &&
                <span
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={(e) => {
                        e.preventDefault()
                        props.onUnInstall()
                    }}
                >
                    Uninstall
                </span>
            }
            { // render custom actions
                props.customActions?.map( val => 
                    <span
                        style={{ color:val.color,  cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault();
                            if (val.onClick)
                                val.onClick(props.info);
                        }}
                    >
                        {val.label}
                    </span>
                )
            }
        </div>
    )
}
