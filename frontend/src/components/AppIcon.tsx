import React from 'react'
import * as Icon from 'react-feather'
import { Progress } from 'reactstrap'
export interface AppIconProps {
    label: string
    iconImg: string
    width: string
    height: string
    percent?: number
    iconOnly?: boolean
    isDownloadable?: boolean
    downloadStatus?: 'error' | 'completed' | 'downloading'
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    let progressColor = 'primary'
    if (props.downloadStatus === 'error') {
        progressColor = 'danger'
    } else if (props.downloadStatus === 'completed') {
        progressColor = 'success'
    }
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
                textAlign: 'center',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    border: '3px solid black',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '10px',
                }}
            >
                <img
                    src={props.iconImg}
                    alt={props.label}
                    style={{ width: '100%', height: '100%' }}
                />
                {props.isDownloadable && (
                    <Icon.Download
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            cursor: 'pointer',
                        }}
                        color="blue"
                        height={20}
                        width={20}
                    />
                )}
            </div>
            {props.downloadStatus && (
                <Progress
                    value={props.percent}
                    color={progressColor}
                    animated={
                        props.downloadStatus === 'downloading' ? true : false
                    }
                />
            )}
            {!props.iconOnly && !props.downloadStatus && <h4>{props.label}</h4>}
        </div>
    )
}
