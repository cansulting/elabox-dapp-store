import React, { useRef,useState } from 'react'
import * as Icon from 'react-feather'
import {
    Container,
    Row,
    Col,
    ProgressBar,
    Popover,
    PopoverBody,
} from 'react-bootstrap'
import { AppButton } from './AppButton'
import { DependencyModal } from './partials/Modals/Dependency'
import { AppInfoAction, AppInfoSetting, AppInfoSettingProps } from './AppInfoSetting'
import { ProgressColor } from '../../utils/colors'
import { PackageInfo, isUpdatable, isLaunchable, isUpdateCompat } from '../../data/packageInfo'
import { Notification } from '../../data/notification'
import { AppStatusToCaption } from '../../utils/appStatus'
import IpfsImage from '../ui/IpfsImage'
import { AppInfoToolbar } from './AppInfoToolbar'
import { MyImage } from '../ui/MyImage'

export interface AppInfoProps {
    info: PackageInfo
    style?: object
    footer?: JSX.Element
    customActions?: AppInfoAction[]             // custom secondary actions for app info
    isDependent?: boolean
    onInstall?: (pkg:PackageInfo) => void
    onCancel?: (pkg:PackageInfo) => void
    onUninstall?: (pkg:PackageInfo) => void
    onCheckIfDependent?: (pkg:PackageInfo) => void
    onUpdate?: (pkg:PackageInfo) => void
    onOff?: (pkg:PackageInfo) => Promise<string>    
    onOn?: (pkg:PackageInfo) => Promise<string>  
    onLaunch?: (pkg:PackageInfo) => void,
    onAppStateChanged ?: (pkg:PackageInfo) => void
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
const Notifications = (props: {data : Notification[]}) => {
    return (<>
        {
            props.data.map( (val:Notification) => {
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
        <Popover
            placement="bottom"
        >
            <PopoverBody>
                <AppInfoSetting {...props.setting} />
            </PopoverBody>
        </Popover>
    )
}
export const AppInfo = (props: AppInfoProps): JSX.Element => {
    const [isOpenDependencyModal,setIsOpenDependencyModal] = useState(false)
    const settingPopoverRef = useRef(null)
    const progressColor = ProgressColor(props.info.status)
    const info = props.info;
    let progress = info.progress;
    const updatable = isUpdatable(props.info)
    const sysCompatible = isUpdateCompat(props.info)
    if (!(progress > 0) && props.info.status === "installing") 
        progress = 95
    const handleInstall = () => {
        if (props.onInstall) props.onInstall(props.info)
    }
    const handleUninstall = () => {
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
    const handleCheckIfDependency = (evnt:any) => {
        props.onCheckIfDependent(props.info)
    }
    const handleOnOpenDependencyModal = () =>{
        if(props.info.dependencies && props.info.dependencies.length>0){
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
            <DependencyModal 
                dependencies={props.info.dependencies}
                isOpen={isOpenDependencyModal} 
                onClose={handleOnCloseDependencyModal} 
                onConfirm={handleOnConfirmInstall}/>  
            {/* <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                }}
            >
                       

                {props.onBack && <h3 style={{ cursor: 'pointer' }} onClick={props.onBack}>
                    <p style={{display:'flex', alignItems: 'center'}}>
                        <Icon.ArrowLeftCircle style={{ marginRight: 5, color:'#0d6efd' }} />
                        <span><h5 style={{color:'#0d6efd', margin: 0}}>Apps</h5></span>
                    </p>
                </h3>}
            </div> */}
            <Row>
                <Col
                    className="text-center text-lg-start d-flex flex-column align-items-center"
                    xs="12"
                    lg="12"
                >
                    <MyImage {...info} />
                </Col>
                <Col
                    className="d-flex flex-column align-items-center mt-3"
                    style={{ gap: 5 }}
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
                    { props.info.isService && props.info.status === "installed" && !props.info.enabled &&
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{
                                width: '100%',
                            }}
                        >
                            <p style={{color:'red'}}>
                                Disabled
                            </p>
                        </div>
                    }
                    <AppInfoToolbar
                        info={info}
                        onUnInstall={handleUninstall}
                        onCheckIfDependent={handleCheckIfDependency}
                        onResync={props.onResync}
                        onDisable={props.onDisable}
                        onRestart={props.onRestart}
                        onOff={handleOff}
                        onOn={handleOn}
                        onUpdate={handleUpdate}
                        onLaunch={handleLaunch}
                        onInstall={handleOnOpenDependencyModal}
                        isDependent={props.isDependent}
                    />           
                    { info.status !== "uninstalling" && info.status !== "installed" && info.status !== "uninstalled"  && (
                        <div
                        className="d-flex flex-column align-items-center align-items-lg-start"
                        style={{
                            width: '100%',
                        }}
                    >
                        <p>
                            {AppStatusToCaption(info.status)}
                        </p>

                        { progress > 0 && <div 
                            className="d-flex align-items-center justify-content-center align-items-lg-center" 
                            style={{ width: '30%',gap:5 }}
                        >
                            <ProgressBar
                                style={{width:"100%"}}
                                now={progress}
                                color={progressColor}
                                animated={false}
                            />
                            <AppButton 
                                size="sm" 
                                disabled={info.status !== "downloading"}
                                style={{width:"20px",height:"20px",padding:"0px"}}
                                outline
                                variant="light"
                                onClick={handleCancel}>
                                <Icon.X className="pb-1" color="gray" size={20}/>
                            </AppButton>                                
                        </div> }
                    </div>  
                    ) }
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
                    ) }
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
            {props.info.dependencies?.length > 0 && <Row className="mt-4">
                <Col>
                    <h4 className='mb-4'>Depedencies</h4>
                    <div className="d-flex text-center mt-2">
                        {props.info.dependencies?.map((dependency:any) => {
                            return <div style={{width:"15%"}}>
                                <img src={dependency.icon} width="50%"/>
                                <p>{dependency.name}</p>                                
                            </div>
                        })}
                    </div>
                </Col>
            </Row>}           
        </Container>
    )
}
