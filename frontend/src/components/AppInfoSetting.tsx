import React, { useState } from 'react'
import { Spinner } from 'reactstrap'
import { PackageInfo } from '../data/packageInfo'
import { ConfirmationModal } from './partials/Modals/Confirmation'
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
    onCheckIfDependent: Function
    isDependent: boolean,
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
    const [isOpenUninstallModal,setIsOpenUninstallModal] = useState(false)
    const handleOnOpenUninstallModal = (e:React.MouseEvent) =>{
        e.preventDefault()
        props.onCheckIfDependent()
        setIsOpenUninstallModal(true)
    }
    const handleOnCloseUninstallModal = () =>{
        setIsOpenUninstallModal(false)
    }
    const handleOnConfirmUninstall = (e:React.MouseEvent) =>{
        e.preventDefault()
        props.onUnInstall()        
        setIsOpenUninstallModal(false)
    }
    console.log("!!!", props.isDependent)
    const confirmationMessage = props.isDependent ? 
    "You are about to uninstall a package that is required by other packages. Uninstalling might affects its functionality.":
    `Are you sure you want to permanently remove ${props.info.name} including its data?`
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
            <ConfirmationModal 
            title={`Uninstall ${props.info.name}`}
            body={confirmationMessage}
            isOpen={isOpenUninstallModal} 
            onClose={handleOnCloseUninstallModal} 
            onConfirm={handleOnConfirmUninstall} />            
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
                    {props.info.status === "installed" &&
                    <span
                    style={{ cursor: 'pointer',color: `${!props.info.isRunning ? "green":"red"}` }}
                    onClick={handleServiceStatusChange}
                >
                        {isServiceLoading && <Spinner children="" size="sm" color="secondary" />}
                        {props.info.isRunning && !isServiceLoading && "Disable"}
                        {!props.info.isRunning && !isServiceLoading && "Enable"}
                    </span>
                }                        
                </>
            }
            {props.info.category !== 'system' &&
                <span
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={handleOnOpenUninstallModal}
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
