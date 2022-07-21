import React,{ useState } from 'react'
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
    onResync?: Function
    onDisable?: Function
    onRestart?: Function
}

export const AppInfoSetting = (props: AppInfoSettingProps): JSX.Element => {
    const [isOpenUninstallModal,setIsOpenUninstallModal] = useState(false)
    const handleOnOpenUninstallModal = (e:React.MouseEvent) =>{
        e.preventDefault()
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
            body={`Are you sure you want to permanently remove ${props.info.name} including its data?`}
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
