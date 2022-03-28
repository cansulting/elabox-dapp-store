import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
export interface AppDashboardProps {
    apps: AppIconProps[],
    onClick?: (app : AppIconProps) => void,
    style?: object
}

export const AppDashboard = (props: AppDashboardProps): JSX.Element => {
    if (props.apps === null) 
        return <></>
    return (
        <Container style={props.style} fluid="md">
            <Row xs="3">
                {props.apps.map((appInfo) => {
                    const onClick = props.onClick
                    appInfo = {...appInfo, onClick }
                    return (
                        <Col>
                            <AppIcon {...appInfo} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}
