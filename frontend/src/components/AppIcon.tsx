import React from 'react'
import * as Icon from 'react-feather'
import { Progress } from 'reactstrap'
import { ProgressColor } from '../utils/colors'
import { AppStatus } from "../utils/appStatus"
export interface AppIconProps {
    className?: string
    id:string
    label: string
    iconImg: string
    width?: string
    height?: string
    percent?: number
    //iconOnly?: boolean
    notification?: number
    status: AppStatus
    version?: string
    build?: string
    stats?: [any]
    body?: JSX.Element
    footer?: JSX.Element
    isInstallable?: boolean
    isUpdatable?: boolean
    isLaunchable?: boolean
    isService?: boolean
    onClick?: (app: AppIconProps) => void
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    const progressColor = ProgressColor(props.status)
    return (
        <div
            className={props.className}
            style={{
                width: props.width,
                height: props.height,
                textAlign: 'center',
            }}
            onClick={(ev) => props.onClick(props)}
        >
            <div
                style={{
                    position: 'relative',
                    marginBottom: 10,
                }}
            >
                <img
                    src={props.iconImg}
                    alt={props.label}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
                {props.notification > 0 && (
                    <Icon.Bell
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            border: '1px solid lightgrey',
                            borderRadius: '50%',
                            background: 'red',
                            padding: 5,
                            cursor: 'pointer',
                        }}
                        color="white"
                        height={20}
                        width={20}
                    />
                )}
                {props.status === "uninstalled" && (
                    <Icon.Download
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            border: '1px solid lightgrey',
                            borderRadius: '50%',
                            background: 'blue',
                            padding: 5,
                            cursor: 'pointer',
                        }}
                        color="white"
                        height={20}
                        width={20}
                    />
                )}
            </div>
            {props.percent > 0 && (
                <Progress
                    style={{height: "6px"}}
                    value={props.percent}
                    color={progressColor}
                />
            )}
            {(!props.percent || props.percent <= 0) && <h4>{props.label}</h4>}
        </div>
    )
}
