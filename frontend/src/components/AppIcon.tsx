import React from 'react'
import * as Icon from 'react-feather'
import { Progress } from 'reactstrap'
import { ProgressColor } from '../utils/colors'
import { isUpdatable, isUpdateCompat, PackageInfo } from "../data/packageInfo"

export interface AppIconProps {
    className?: string
    package: PackageInfo
    width?: number
    height?: number
    //body?: JSX.Element
    //footer?: JSX.Element
    onClick?: (app: PackageInfo) => void
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    const pkg = props.package
    const status = pkg.status
    const progressColor = ProgressColor(status)
    //console.log("icon", pkg)
    return (
        <div
            className={props.className}
            style={{
                // width: props.width,
                // height: props.height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection:"column",
                textAlign: 'center',
                cursor:'pointer'
            }}
            onClick={(ev) => props.onClick(props.package)}
        >
            <div
                style={{
                    position: 'relative',
                    marginBottom: 10,
                    width: props.width,
                    height: props.height
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
                {(pkg.progress <= 0 && isUpdatable(pkg)) && isUpdateCompat(pkg) && 
                    (<Icon.RefreshCw
                        style={{
                            position: 'absolute',
                            bottom: '3%',
                            right: '3%',
                            borderRadius: '50%',
                            background: '#0081ff',
                            padding: '3%',
                        }}
                        color="white"
                        height={"20%"}
                        width={"20%"}
                    />) }
                { (pkg.status === "uninstalled" && pkg.progress === 0) &&
                (
                    <Icon.Download
                        style={{
                            position: 'absolute',
                            bottom: '3%',
                            right: '3%',
                            borderRadius: '50%',
                            background: '#0081ff',
                            padding: '3%',
                        }}
                        color="white"
                        height={"20%"}
                        width={"20%"}
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
