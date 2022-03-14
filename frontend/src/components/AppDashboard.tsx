import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
export interface AppDashboardProps {
    apps: [AppIconProps]
    style: object
}

export const AppDashboard = (props: AppDashboardProps): JSX.Element => {
    return (
        <Container style={props.style} fluid="md">
            <Row xs="1" md="1" lg="3">
                {props.apps.map((appInfo) => {
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
