import React, { useRef,useState } from 'react'
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
import { DependencyModal } from './partials/Modals/Dependency'
import { AppInfoAction, AppInfoSetting, AppInfoSettingProps } from './AppInfoSetting'
import { ProgressColor } from '../utils/colors'
import { PackageInfo, isUpdatable, isLaunchable, isUpdateCompat } from '../data/packageInfo'
import { MessagePrompt } from '../data/messagePrompt'
import { AppStatusToCaption } from '../utils/appStatus'



export interface AppInfoProps {
    info: PackageInfo
    style?: object
    footer?: JSX.Element
    customActions?: AppInfoAction[]             // custom secondary actions for app info
    onInstall?: (pkg:PackageInfo) => void
    onCancel?: (pkg:PackageInfo) => void
    onUninstall?: (pkg:PackageInfo) => void
    onUpdate?: (pkg:PackageInfo) => void
    onOff?: (pkg:PackageInfo) => Promise<string>    
    onOn?: (pkg:PackageInfo) => Promise<string>  
    onCheckStatus?: (pkg:PackageInfo) => void
    onLaunch?: (pkg:PackageInfo) => void,
    onAppStateChanged ?: (pkg:PackageInfo) => void,
    onResync?: () => void
    onDisable?: () => void
    onRestart?: () => void
    onBack?: () => void
    children?: any
}
interface SettingPopOverRef {
    popOverRef: React.RefObject<any>
    setting: AppInfoSettingProps
}
const Notifications = (props: {data : MessagePrompt[]}) => {
    return (<>
        {
            props.data.map( (val:MessagePrompt) => {
                return (<>
                    { val.type === "error" && <p style={{color:'red'}}>{val.content}</p>}
                    { val.type === 'info' && <p style={{color:'green'}}>{val.content}</p>}
                    { val.type === 'warning' && <p style={{color:'gray'}}>{val.content}</p>}
                </>)
            })
        }
    </>)
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
    const [isOpenDependencyModal,setIsOpenDependencyModal] = useState(false)
    const settingPopoverRef = useRef(null)
    const progressColor = ProgressColor(props.info.status)
    const info = props.info;
    const progress = info.progress;
    const updatable = isUpdatable(props.info)
    const sysCompatible = isUpdateCompat(props.info)
    const handleInstall = () => {
        if (props.onInstall) props.onInstall(props.info)
    }
    const handleUninstall = (evnt:any) => {
        if (props.onUninstall) props.onUninstall(props.info)
    } 
    const handleLaunch = (evnt:any) => {
        if (props.onUninstall) props.onLaunch(props.info)
    } 
    const handleCancel = (evnt:any) => {
        if(props.onCancel) props.onCancel(props.info)
    }
    const handleUpdate = (evnt:any) => {
        if (props.onUninstall && sysCompatible) props.onUpdate(props.info)
    } 
    const handleOnOpenDependencyModal = () =>{
        if(props.info.dependencies.length>0){
            setIsOpenDependencyModal(true)
            return
        }
        setIsOpenDependencyModal(false) 
        handleInstall()
    }
    const handleOnCloseDependencyModal = () =>{
        setIsOpenDependencyModal(false)
    }
    const handleOnConfirmInstall = () =>{
        setIsOpenDependencyModal(false) 
        handleInstall()
    }    
    const handleOff = () => {
        return props.onOff(props.info)
    }
    const handleOn = () => {
        return props.onOn(props.info)
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
                <DependencyModal 
                dependencies={props.info.dependencies}
                isOpen={isOpenDependencyModal} 
                onClose={handleOnCloseDependencyModal} 
                onConfirm={handleOnConfirmInstall}/>         

                <h3 style={{ cursor: 'pointer' }} onClick={props.onBack}>
                    <p style={{display:'flex', alignItems: 'center'}}>
                        <Icon.ArrowLeftCircle style={{ marginRight: 5, color:'#0d6efd' }} />
                        <span><h5 style={{color:'#0d6efd', margin: 0}}>Apps</h5></span>
                    </p>
                </h3>
                {info.status === "installed" && (
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
                                    info:info,
                                    customActions: props.customActions,
                                    isService: props.info.isService,
                                    onUnInstall: handleUninstall,
                                    onResync: props.onResync,
                                    onDisable: props.onDisable,
                                    onRestart: props.onRestart,
                                    onOff: handleOff,
                                    onOn: handleOn,
                                    
                                }}
                            />
                        </>
                    )
                }
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
                    <h4>{info.name}</h4>
                    { 
                        info.notificationContents && 
                        info.notificationContents.length > 0 && 
                        <Notifications data={info.notificationContents}/> 
                    }
                    {
                    (updatable || info.status === "uninstalled") && !sysCompatible && 
                        <p style={{color:'gray'}}>Requires latest system to install this package.</p>
                    }
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 5,
                        }}
                    >
                        { sysCompatible && updatable && (
                            <AppButton
                                color="primary"
                                size="sm"
                                active={sysCompatible}
                                outline
                                onClick={ handleUpdate}
                            >
                                Update
                            </AppButton>
                        )}
                        { isLaunchable(info) && (
                            <AppButton
                                color="primary"
                                size="sm"
                                onClick={handleLaunch}
                            >
                                Launch
                            </AppButton>
                        )}
                    </div>
                    { sysCompatible && info.status === "uninstalled" && (
                        <AppButton 
                            color="primary" 
                            size="sm" outline 
                            onClick={handleOnOpenDependencyModal}>
                            Install
                        </AppButton>
                    )}                  
                    { info.status !== "uninstalling" && progress > 0 && (
                        <div
                        className="d-flex flex-column align-items-center align-items-lg-start"
                        style={{
                            width: '100%',
                        }}
                    >
                        <p>
                            {AppStatusToCaption(info.status)}
                        </p>
                        <div 
                            className="d-flex align-items-center justify-content-center align-items-lg-center" 
                            style={{ width: '30%',gap:5 }}
                        >
                            <Progress
                                style={{width:"100%"}}
                                value={progress}
                                color={progressColor}
                                animated={false}
                            />
                            <AppButton 
                                color="danger" 
                                size="sm" 
                                disabled={info.status !== "downloading"}
                                outline
                                onClick={handleCancel}>
                                <Icon.X  color="white" size={14}/>
                            </AppButton>                                
                        </div>
                    </div>  
                    )}
                    { (info.status === "uninstalling" || info.status === "wait_depends") && (
                        <div
                            className="d-flex flex-column align-items-center align-items-lg-start"
                            style={{
                                width: '100%',
                            }}
                        >
                            <p>
                                {AppStatusToCaption(info.status)}
                            </p>
                    </div>
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <p>{props.info.description}</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>What's New</h4>
                    <p>{props.info.updates}</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Package details</h4>
                    <p>
                        <span>Package Id: {props.info.id}</span>
                        <br />
                        <span>Version: {info.version}</span>
                        <br />
                        <span>Build: {info.currentBuild}</span>
                        <br />
                    </p>
                </Col>
            </Row>
            {props.children}
        </Container>
    )
}
