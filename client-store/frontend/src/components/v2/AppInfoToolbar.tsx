import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { isLaunchable, isUpdatable, isUpdateCompat, PackageInfo } from '../../data/packageInfo'
import { AppButton } from './AppButton'
import { ConfirmationModal } from './partials/Modals/Confirmation'
export interface AppInfoAction {
    label: string
    color?: string
    onClick?: (pkg: PackageInfo) => void
}

export interface AppInfoToolbarProps {
    info: PackageInfo
    onCheckIfDependent: Function
    isDependent: boolean,
    onUnInstall?: Function
    onUpdate?: Function
    onResync?: Function
    onDisable?: Function
    onRestart?: Function
    onLaunch?: Function
    onInstall?: Function
    onOn?: () => Promise<string>
    onOff?: () => Promise<string>
} 

export const AppInfoToolbar = (props: AppInfoToolbarProps): JSX.Element => {
    const [isServiceLoading,setIsServiceLoading] = useState(false)
    const updatable = isUpdatable(props.info)
    const sysCompatible = isUpdateCompat(props.info)
    const handleServiceStatusChange = (e:React.MouseEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setIsServiceLoading(true)        
        if(props.info.enabled) {
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
    const handleOnOpenUninstallModal = () =>{
        props.onCheckIfDependent()
        setIsOpenUninstallModal(true)
    }
    const handleOnCloseUninstallModal = () =>{
        setIsOpenUninstallModal(false)
    }
    const handleOnConfirmUninstall = () =>{
        props.onUnInstall()        
        setIsOpenUninstallModal(false)
    }
    const confirmationMessage = props.isDependent ? 
    "You are about to uninstall a package that is required by other packages. Uninstalling might affects its functionality.":
    `Are you sure you want to permanently remove ${props.info.name} including its data?`
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
            }}
        >
            <ConfirmationModal 
            title={`Uninstall ${props.info.name}`}
            body={confirmationMessage}
            isOpen={isOpenUninstallModal} 
            onClose={handleOnCloseUninstallModal} 
            onConfirm={handleOnConfirmUninstall} />    
            { sysCompatible && updatable && (
                <AppButton
                    size="sm"
                    active={sysCompatible}
                    outline
                    onClick={ props.onUpdate}
                >
                    Update
                </AppButton>
            )}
            { sysCompatible && props.info.status === "uninstalled" && (
                <AppButton 
                    size="sm" outline 
                    onClick={props.onInstall}>
                    Install
                </AppButton>
            )}               
            {props.info.isService && 
                <>
                    <AppButton
                        color="danger"
                        size="sm"
                        outline
                        onClick={ props.onResync }
                    >
                        Clear
                    </AppButton>
                    <AppButton
                        color="danger"
                        size="sm"
                        outline
                        onClick={ props.onRestart }
                    >
                        Restart
                    </AppButton>
                    {props.info.status === "installed" &&
                        <AppButton
                            color={!props.info.enabled ? "primary":"danger"}
                            size="sm"
                            outline
                            onClick={handleServiceStatusChange}
                        >
                            {isServiceLoading && <Spinner children="" size="sm" color="secondary" animation={'border'} />}
                            {props.info.enabled && !isServiceLoading && "Disable"}
                            {!props.info.enabled && !isServiceLoading && "Enable"}
                        </AppButton>
                    }                        
                </>
            }
            {props.info.status === 'installed' && props.info.category !== 'system' &&
                <AppButton
                    color="danger"
                    size="sm"
                    outline
                    onClick={ handleOnOpenUninstallModal }
                >
                    Uninstall
                </AppButton>
            }
            { isLaunchable(props.info) && (
                <AppButton
                    size="sm"
                    onClick={props.onLaunch}
                >
                    Launch
                </AppButton>
            )}
        </div>
    )
}
