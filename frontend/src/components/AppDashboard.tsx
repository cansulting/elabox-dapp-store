import React,{useRef,useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap'
import { PackageInfo } from '../data/packageInfo'
import { AppIconCon } from '../container/AppIconCon'
import useResize from "../hooks/useResize"
export interface AppDashboardProps {
    apps: PackageInfo[],
    onClick?: (app : PackageInfo) => void,
    iconWidth?: string
    iconHeight?: string
    style?: object
}

export const AppDashboard = (props: AppDashboardProps): JSX.Element => {
    const parentDiv = useRef<HTMLDivElement>(null);    
    const iconWidth = parseInt(props.iconWidth);
    const iconHeight = parseInt(props.iconHeight);
    const {width : parentWidth} = useResize(parentDiv)
    const iconWidthWithPadding = iconWidth + 40
    const columnPerRow = Math.floor(parentWidth  / iconWidthWithPadding)
    if (props.apps === null) 
        return <></>
    return (
        <div style={props.style} ref={parentDiv}>
            <Container style={{width:"100%"}}>
                <Row xs={columnPerRow}>
                    {props.apps.map((appInfo) => {
                        return (
                            <Col key={appInfo.id + "-dash"}>
                                <AppIconCon 
                                    package={appInfo} 
                                    onClick={props.onClick}
                                    width={iconWidth}
                                    height={iconHeight}
                                    />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}
