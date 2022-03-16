import React from 'react'
import * as Icon from 'react-feather'
import { Progress } from 'reactstrap'
import { ProgressColor } from '../utils/colors'
export interface AppIconProps {
    className?: string
    label: string
    iconImg: string
    width: string
    height: string
    percent?: number
    iconOnly?: boolean
    isInstallable?: boolean
    processStatus?:
        | 'error'
        | 'completed'
        | 'downloading'
        | 'installing'
        | 'syncing'
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    const progressColor = ProgressColor(props.processStatus)
    return (
        <div
            className={props.className}
            style={{
                width: props.width,
                height: props.height,
                textAlign: 'center',
            }}
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
                {props.isInstallable && (
                    <Icon.Download
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            background: 'lightgrey',
                            padding: 5,
                            cursor: 'pointer',
                        }}
                        color="blue"
                        height={20}
                        width={20}
                    />
                )}
            </div>
            {!props.iconOnly && props.processStatus?.length > 0 && (
                <Progress
                    value={props.percent}
                    color={progressColor}
                    animated={
                        props.processStatus === 'downloading' ||
                        props.processStatus === 'installing'
                            ? true
                            : false
                    }
                />
            )}
            {!props.iconOnly && !props.processStatus && <h4>{props.label}</h4>}
        </div>
    )
}
