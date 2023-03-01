import React,{CSSProperties, useState} from 'react'
import * as Icon from 'react-feather'
import { ProgressColor } from '../../utils/colors'
import { isUpdatable, isUpdateCompat, PackageInfo } from "../../data/packageInfo"
import { ProgressBar } from 'react-bootstrap'
import { MyImage } from '../ui/MyImage'

const DefaultStyle = (props:any) => {
    const { hover } = props
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        textAlign: 'center',
        cursor: "pointer",
        backgroundColor: !hover  ? "white" : "#ebebeb",
        opacity: hover ? 0.8 : 1,
        borderRadius: 10,
        marginBottom: 10,
        height: props.height + 50
    } as CSSProperties
}


export interface AppIconProps {
    className?: string
    package: PackageInfo
    width?: number
    height?: number
    style?: CSSProperties
    //body?: JSX.Element
    //footer?: JSX.Element
    onClick?: (app: PackageInfo) => void
}
export const AppIcon = (props: AppIconProps): JSX.Element => {
    const [onHover,setOnHover] = useState(false)
    const handleOnHover = (isHover:boolean) =>{
        setOnHover(isHover)
    }
    const pkg = props.package
    const status = pkg.status
    const progressColor = ProgressColor(status)
    let progress = pkg.progress
    if (!(progress > 0) && pkg.status === "installing") 
        progress = 95
    const _style = {
        ...DefaultStyle({...props, hover:onHover}), 
        ...props.style}
    return (
        <div
            className={props.className}
            style={_style}
            onClick={(ev) => props.onClick(props.package)}
            onMouseEnter={()=>handleOnHover(true)}
            onMouseLeave={()=>handleOnHover(false)}
        >
            <div
                style={{
                    position: 'relative',
                    marginBottom: 10,
                    width: props.width,
                    height: props.height,
                    padding: 10
                }}
            >
                <MyImage {...props.package} />
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
                {progress > 0 && (
                <ProgressBar
                    style={{height: "6px", width: "100%", margin: "10px 0"}}
                    now={progress}
                    color={progressColor}
                />
            )}
            </div>
            {(!progress || progress <= 0) && 
                <h4 style={{fontSize:"clamp(1rem, 1vw, 2rem)",fontWeight:"500"}}>
                    {pkg.name}
                </h4>}
        </div>
    )
}
