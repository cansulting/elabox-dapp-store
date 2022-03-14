import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
interface Info {
    id: number
    label: string
    iconImg: string
    description: string
    isDownloadble: boolean
    percent?: 0
    downloadStatus?: 'error' | 'completed' | 'downloading'
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
        width: '200px',
        height: '200px',
        percent: props.info.percent,
        isDownloadable: props.info.isDownloadble,
        downloadStatus: props.info.downloadStatus,
    }
    return (
        <Container style={props.style} fluid="xs">
            <Row md="2">
                <Col
                    className="text-center text-md-start d-sm-flex flex-sm-column align-items-center"
                    xs="12"
                    md="2"
                >
                    <AppIcon {...AppIconDetails} className="p-2" />
                </Col>
                <Col xs="12" md="10" className="text-center text-md-start">
                    <h4>{props.info.label}</h4>
                </Col>
            </Row>
            <p>{props.info.description}</p>
        </Container>
    )
}
