import React from 'react'
import * as Icon from 'react-feather'
import { Progress } from 'reactstrap'
import { ProgressColor } from '../utils/colors'
import { PackageInfo } from "../data/packageInfo"

export interface AppIconProps {
    className?: string
    package: PackageInfo
    width?: string
    height?: string
    //body?: JSX.Element
    //footer?: JSX.Element
    onClick?: (app: PackageInfo) => void
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    const progressColor = ProgressColor(props.package.status)
    return (
        <div
            className={props.className}
            style={{
                width: props.width,
                height: props.height,
                textAlign: 'center',
            }}
            onClick={(ev) => props.onClick(props.package)}
        >
            <div
                style={{
                    position: 'relative',
                    marginBottom: 10,
                }}
            >
                <img
                    src={props.package.icon}
                    alt={props.package.name}
                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
                {props.package.notifications > 0 && (
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
                {props.package.status === "uninstalled" && (
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
            {props.package.progress > 0 && (
                <Progress
                    style={{height: "6px"}}
                    value={props.package.progress}
                    color={progressColor}
                />
            )}
            {(!props.package.progress || props.package.progress <= 0) && <h4>{props.package.name}</h4>}
        </div>
    )
}
