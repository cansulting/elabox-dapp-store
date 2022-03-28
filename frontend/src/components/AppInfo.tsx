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
import { AppButton } from './AppButton'
import { AppInfoSetting, AppInfoSettingProps } from './AppInfoSetting'
import { AppLineGraph } from './AppLineGraph'
import { ProgressColor, UppercaseFirstLetter } from '../utils/colors'
import { PackageInfo, isUpdatable, isLaunchable } from '../data/packageInfo'

export interface AppInfoProps {
    info: PackageInfo
    style?: object
    body?: JSX.Element
    footer?: JSX.Element
    onInstall?: (pkg:PackageInfo) => void
    onUninstall?: (pkg:PackageInfo) => void
    onUpdate?: (pkg:PackageInfo) => void
    onLaunch?: (pkg:PackageInfo) => void
    onResync?: () => void
    onDisable?: () => void
    onRestart?: () => void
    onBack?: () => void
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
    const progressColor = ProgressColor(props.info.status)
    const handleInstall = (evnt:any) => {
        if (props.onInstall) props.onInstall(props.info)
    }
    const handleUninstall = (evnt:any) => {
        if (props.onUninstall) props.onUninstall(props.info)
    } 
    const handleLaunch = (evnt:any) => {
        if (props.onUninstall) props.onLaunch(props.info)
    } 
    const handleUpdate = (evnt:any) => {
        if (props.onUninstall) props.onUpdate(props.info)
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
                {props.info.status === "installed" && (
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
                    <img
                        src={props.info.icon}
                        alt={props.info.name}
                        style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: 10,
                        }}
                    />
                </Col>
                <Col
                    className="d-flex flex-column align-items-center align-items-lg-start align-self-end mt-3"
                    style={{ gap: 5 }}
                    xs="12"
                    lg="10"
                >
                    <h4>{props.info.name}</h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                        }}
                    >
                        {isUpdatable(props.info) && (
                            <AppButton
                                color="primary"
                                size="sm"
                                outline
                                onClick={handleUpdate}
                            >
                                Update
                            </AppButton>
                        )}
                        {isLaunchable(props.info) && (
                            <AppButton
                                color="primary"
                                size="sm"
                                onClick={handleLaunch}
                            >
                                Launch
                            </AppButton>
                        )}
                    </div>
                    {props.info.status === "uninstalled" && (
                        <AppButton 
                            color="primary" 
                            size="sm" outline 
                            onClick={handleInstall}>
                            Install
                        </AppButton>
                    )}
                    {props.info.progress > 0 && (
                        <div
                            className="d-flex flex-column align-items-center align-items-lg-start"
                            style={{
                                width: '100%',
                            }}
                        >
                            <p>
                                {UppercaseFirstLetter(props.info.status)}
                            </p>
                            <Progress
                                style={{ width: '30%' }}
                                value={props.info.progress}
                                color={progressColor}
                                animated={
                                    props.info.status ===
                                        'downloading' ||
                                    props.info.status === 'syncing' ||
                                    props.info.status ===
                                        'uninstalling' ||
                                    props.info.status === 'installing'
                                        ? true
                                        : false
                                }
                            />
                        </div>
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>{props.body}</Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Package details</h4>
                    <p>
                        <span>Package Id: {props.info.id}</span>
                        <br />
                        <span>Version: {props.info.version}</span>
                        <br />
                        <span>Build: {props.info.currentBuild}</span>
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
                            <Col>{props.footer}</Col>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}
