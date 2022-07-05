import React,{useRef,useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PackageInfo } from '../data/packageInfo'
import { AppIconCon } from '../container/AppIconCon'
import useResize from "../hooks/useResize"
export interface AppDashboardProps {
    apps: PackageInfo[],
    onClick?: (app : PackageInfo) => void,
    iconWidth?: number
    iconHeight?: number
    style?: object
    beta?:boolean 
}

export const AppDashboard = (props: AppDashboardProps): JSX.Element => {
    const parentDiv = useRef<HTMLDivElement>(null);    
    const {width : parentWidth} = useResize(parentDiv)
    const iconWidthWithPadding = props.iconWidth + 40
    const columnPerRow = Math.floor(parentWidth  / iconWidthWithPadding)
    const columnWidth = Math.floor(parentWidth / columnPerRow)
    if (props.apps === null) 
        return <></>
    return (
        <div style={props.style} ref={parentDiv}>
            <Row className="gx-2" xs={columnPerRow}>
                {props.apps.map((appInfo) => {
                    return (
                        <Col style={{width: columnWidth,maxWidth: columnWidth}} key={appInfo.id + "-dash"}>
                            <AppIconCon 
                                package={appInfo} 
                                onClick={props.onClick}
                                width={props.iconWidth}
                                height={props.iconHeight}
                                />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
