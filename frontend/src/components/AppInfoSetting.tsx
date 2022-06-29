import React, { useState } from 'react'
import { Spinner } from 'reactstrap'
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
    onOn?: () => Promise<string>
    onOff?: () => Promise<string>
}

export const AppInfoSetting = (props: AppInfoSettingProps): JSX.Element => {
    const [isServiceLoading,setIsServiceLoading] = useState(false)
    const handleServiceStatusChange = (e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setIsServiceLoading(true)        
        if(props.info.isRunning) {
            props.onOff().then(()=>{
                setIsServiceLoading(false)
            })
            return
        }
        props.onOn().then(()=>{
            setIsServiceLoading(false)
        })
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
                <span
                    style={{ cursor: 'pointer',color: `${props.info.isRunning ? "green":"red"}` }}
                    onClick={handleServiceStatusChange}
                >
                    {isServiceLoading && <Spinner children="" size="sm" color="secondary" />}
                    {props.info.isRunning && !isServiceLoading && "On"}
                    {!props.info.isRunning && !isServiceLoading && "Off"}
                </span>
            }                        
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
