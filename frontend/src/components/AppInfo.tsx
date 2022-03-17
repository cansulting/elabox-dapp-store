import React from 'react'
import { Container, Row, Col, Progress } from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
import { AppButton } from './AppButton'
import { AppLineGraph } from './AppLineGraph'
import { ProgressColor, UppercaseFirstLetter } from '../utils/colors'
interface Info {
    id: number
    label: string
    iconImg: string
    description: string
    isInstallable: boolean
    isUpdatable: boolean
    percent?: 0
    stats?: [any]
    footer?: object
    processStatus?:
        | 'error'
        | 'completed'
        | 'downloading'
        | 'installing'
        | 'syncing'
}
export interface AppInfoProps {
    info: Info
    style: object
    onInstall: Function
    onUninstall: Function
}
export const AppInfo = (props: AppInfoProps): JSX.Element => {
    const progressColor = ProgressColor(props.info.processStatus)
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
                <Col
                    className="text-center d-flex flex-column align-items-center align-items-lg-start align-self-end text-lg-start mt-3"
                    style={{ gap: 5 }}
                    xs="12"
                    lg="10"
                >
                    <h4>{props.info.label}</h4>
                    {props.info.isInstallable && (
                        <AppButton color="primary" size="sm" outline>
                            Install
                        </AppButton>
                    )}
                    {props.info.processStatus?.length > 0 && (
                        <div style={{ width: '100%' }}>
                            <p>
                                {UppercaseFirstLetter(
                                    props.info.processStatus
                                )}
                            </p>
                            <Progress
                                style={{ width: '30%' }}
                                value={props.info.percent}
                                color={progressColor}
                                animated={
                                    props.info.processStatus ===
                                        'downloading' ||
                                    props.info.processStatus === 'syncing' ||
                                    props.info.processStatus === 'installing'
                                        ? true
                                        : false
                                }
                            />
                        </div>
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