import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
import { AppButton } from './AppButton'
import { AppLineGraph } from './AppLineGraph'
interface Info {
    id: number
    label: string
    iconImg: string
    description: string
    isInstallable: boolean
    percent?: 0
    stats?: [any]
    footer?: object
    processStatus?: 'error' | 'completed' | 'downloading' | 'installing'
}
export interface AppInfoProps {
    info: Info
    style: object
    onInstall: Function
    onUninstall: Function
}
export const AppInfo = (props: AppInfoProps): JSX.Element => {
    const AppIconDetails: AppIconProps = {
        label: props.info.label,
        iconOnly: true,
        iconImg: props.info.iconImg,
        width: '130px',
        height: '130px',
        percent: props.info.percent,
        processStatus: props.info.processStatus,
    }
    return (
        <Container style={props.style} fluid="md">
            <Row lg="2">
                <Col
                    className="text-center text-lg-start d-flex flex-column align-items-center"
                    xs="12"
                    lg="2"
                >
                    <AppIcon {...AppIconDetails} />
                </Col>
                <Col xs="12" lg="10" className="text-center text-lg-start mt-4">
                    <h4>{props.info.label}</h4>
                    {props.info.isInstallable && (
                        <AppButton color="primary" size="sm">
                            Install
                        </AppButton>
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <p>{props.info.description}</p>
                </Col>
            </Row>
            {props.info.stats?.length > 0 && (
                <Row className="mt-4">
                    <Col>
                        <AppLineGraph stats={props.info.stats} />
                    </Col>
                </Row>
            )}
        </Container>
    )
}
