import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
import { PackageInfo } from '../data/packageInfo'
import AppIconCon from '../container/AppIconCon'

export interface AppDashboardProps {
    apps: PackageInfo[],
    onClick?: (app : PackageInfo) => void,
    iconWidth?: string
    iconHeight?: string
    style?: object
}

export const AppDashboard = (props: AppDashboardProps): JSX.Element => {
    if (props.apps === null) 
        return <></>
    return (
        <Container style={props.style} fluid="md">
            <Row xs="3">
                {props.apps.map((appInfo) => {
                    return (
                        <Col key={appInfo.id + "-dash"}>
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
        </Container>
    )
}
