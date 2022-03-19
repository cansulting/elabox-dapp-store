import React from 'react'
export interface AppInfoSettingProps {
    isService: boolean
    onUnInstall: Function
    onResync: Function
    onDisable: Function
    onRestart: Function
}

export const AppInfoSetting = (props: AppInfoSettingProps): JSX.Element => {
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
            <p
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={(e) => {
                    e.preventDefault()
                    props.onUnInstall()
                }}
            >
                Uninstall
            </p>
            {props.isService && (
                <>
                    <p
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onResync()
                        }}
                    >
                        Resync
                    </p>
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onRestart()
                        }}
                    >
                        Restart
                    </p>
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                            e.preventDefault()
                            props.onDisable()
                        }}
                    >
                        Disable
                    </p>
                </>
            )}
        </div>
    )
}
