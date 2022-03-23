import React, { useRef } from 'react'
import * as Icon from 'react-feather'
import {
    Container,
    Row,
    Col,
    Progress,
    UncontrolledPopover,
    PopoverBody,
} from 'reactstrap'
import { AppIcon, AppIconProps } from './AppIcon'
import { AppButton } from './AppButton'
import { AppInfoSetting, AppInfoSettingProps } from './AppInfoSetting'
import { AppLineGraph } from './AppLineGraph'
import { ProgressColor, UppercaseFirstLetter } from '../utils/colors'
interface PacakgeDetails {
    id: string
    version: string
    build: string
}
interface Info {
    id: number
    label: string
    iconImg: string
    isInstallable?: boolean
    isUpdatable?: boolean
    isLaunchable?: boolean
    isService: boolean
    percent?: 0
    stats?: [any]
    body: JSX.Element
    footer?: JSX.Element
    package: PacakgeDetails
    processStatus?:
        | 'error'
        | 'completed'
        | 'downloading'
        | 'installing'
        | 'uninstalling'
        | 'syncing'
}
export interface AppInfoProps {
    info: Info
    style: object
    onInstall: () => void
    onUninstall: () => void
    onUpdate: () => void
    onLaunch: () => void
    onResync: () => void
    onDisable: () => void
    onRestart: () => void
    onBack: () => void
}
interface SettingPopOverRef {
    popOverRef: React.RefObject<any>
    setting: AppInfoSettingProps
}
const SettingPopover = (props: SettingPopOverRef) => {
    return (
        <UncontrolledPopover
            target={props.popOverRef}
            placement="bottom"
            trigger="legacy"
            offset="0, 8"
        >
            <PopoverBody>
                <AppInfoSetting {...props.setting} />
            </PopoverBody>
        </UncontrolledPopover>
    )
}
export const AppInfo = (props: AppInfoProps): JSX.Element => {
    const settingPopoverRef = useRef(null)
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
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                }}
            >
                <h3 style={{ cursor: 'pointer' }} onClick={props.onBack}>
                    <Icon.ArrowLeftCircle style={{ marginRight: 5 }} />
                    Apps
                </h3>
                {!props.info.isInstallable &&
                    !props.info.hasOwnProperty('processStatus') && (
                        <>
                            <p
                                style={{ cursor: 'pointer' }}
                                className="text-primary"
                                id="settingPopover"
                                ref={settingPopoverRef}
                            >
                                <Icon.Settings />
                            </p>
                            <SettingPopover
                                popOverRef={settingPopoverRef}
                                setting={{
                                    isService: props.info.isService,
                                    onUnInstall: props.onUninstall,
                                    onResync: props.onResync,
                                    onDisable: props.onDisable,
                                    onRestart: props.onRestart,
                                }}
                            />
                        </>
                    )}
            </div>
            <Row lg="2">
                <Col
                    className="text-center text-lg-start d-flex flex-column align-items-center"
                    xs="12"
                    lg="2"
                >
                    <AppIcon {...AppIconDetails} />
                </Col>
                <Col
                    className="d-flex flex-column align-items-center align-items-lg-start align-self-end mt-3"
                    style={{ gap: 5 }}
                    xs="12"
                    lg="10"
                >
                    <h4>{props.info.label}</h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                        }}
                    >
                        {props.info.isUpdatable && (
                            <AppButton
                                color="primary"
                                size="sm"
                                outline
                                onClick={props.onUpdate}
                            >
                                Update
                            </AppButton>
                        )}
                        {props.info.isLaunchable && (
                            <AppButton
                                color="primary"
                                size="sm"
                                onClick={props.onLaunch}
                            >
                                Launch
                            </AppButton>
                        )}
                    </div>
                    {props.info.isInstallable && (
                        <AppButton color="primary" size="sm" outline>
                            Install
                        </AppButton>
                    )}
                    {props.info.processStatus?.length > 0 && (
                        <div
                            className="d-flex flex-column align-items-center align-items-lg-start"
                            style={{
                                width: '100%',
                            }}
                        >
                            <p>
                                {UppercaseFirstLetter(props.info.processStatus)}
                            </p>
                            <Progress
                                style={{ width: '30%' }}
                                value={props.info.percent}
                                color={progressColor}
                                animated={
                                    props.info.processStatus ===
                                        'downloading' ||
                                    props.info.processStatus === 'syncing' ||
                                    props.info.processStatus ===
                                        'uninstalling' ||
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
                <Col>{props.info.body}</Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Package details</h4>
                    <p>
                        <span>Package Id: {props.info.package.id}</span>
                        <br />
                        <span>Version: {props.info.package.version}</span>
                        <br />
                        <span>Build: {props.info.package.build}</span>
                        <br />
                    </p>
                </Col>
            </Row>
            {props.info.stats?.length > 0 && (
                <>
                    <Row className="mt-4">
                        <Col>
                            <AppLineGraph stats={props.info.stats} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Col>{props.info.footer}</Col>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}
