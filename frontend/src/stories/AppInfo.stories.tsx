import React, { useEffect } from 'react'
import { AppInfo, AppInfoProps } from '../components/AppInfo'

import { ComponentMeta } from '@storybook/react'
import { retrieveListing } from '../actions/appLib'
import { useState } from '@storybook/addons'
import { AppInfoCon } from '../container/AppInfoCon'
import { Col, Row } from 'reactstrap'
import { AppLineGraph } from '../components/AppLineGraph'

export default {
    title: 'Elabox/components/AppInfo',
    component: AppInfo,
} as ComponentMeta<typeof AppInfo>

const Template = (props: AppInfoProps): JSX.Element => <AppInfo {...props} />

export const Primary = Template.bind({})

Primary.args = {
    info: {
        "name": "Sample App",
        "id": "ela.sample",
        "description": "This is sample app",
        "icon" : "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/vvtuyg7ay25uziwmpeac",
        "updates": "This is updates",
        "currentBuild": 2,
        "latestBuild": 3,
        "version": "0.1.0",
        "projectRepo": "",
        "projectWebsite": "",
        "status":"installed",
    },
    onInstall: () => {},
    onUninstall: () => {},
    style: { height: '100vh', padding: 10 },
}
export const Installable = Template.bind({})

Installable.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        currentBuild: 0
    },
}
export const Downloading = Template.bind({})

Downloading.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        progress: 30,
        status: 'downloading',
    },
}
export const Installing = Template.bind({})

Installing.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        progress: 90,
        status: 'installing',
    },
}
export const UnInstalling = Template.bind({})

UnInstalling.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        progress: 90,
        status: 'uninstalling',
    },
}

export const Updatable = Template.bind({})

Updatable.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        currentBuild: 1,
        latestBuild:2
    },
}
export const Launchable = Template.bind({})

Launchable.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        status: "installed",
        currentBuild: 1,
        latestBuild:1
    },
}
export const InstallationError = Template.bind({})

InstallationError.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 90,
        status: 'error',
        notificationContents: [{
            content: "This is a sample error",
            type: "error"
        }]
    },
}

export const InstallationSuccess = Template.bind({})

InstallationSuccess.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 100,
        processStatus: 'completed',
    },
}
export const Syncing = Template.bind({})

Syncing.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 20,
        processStatus: 'syncing',
    },
}

const TemplateStats = (props: AppInfoProps): JSX.Element => {
    const stats = Labels.map(() => Math.random())
    return ( <AppInfo {...props} >
        {stats?.length > 0 && (
            <>
                <Row className="mt-4">
                    <Col>
                        <AppLineGraph stats={stats} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Col>{props.footer}</Col>
                    </Col>
                </Row>
            </>
        )}
    </AppInfo>) 
}
const Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       ']

export const WithStats = TemplateStats.bind({})

WithStats.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        footer: (
            <>
                <h4>Application Details</h4>
                <p>IP: 192.168.18.70</p>
            </>
        ),
        isService: true,
    },
}

const Template2 = (props: AppInfoProps) : JSX.Element => {
    const [currentPkg, setPkg] = useState(null)
    useEffect( () =>{
        if (currentPkg === null)
            retrieveListing("ela.carrier")
                .then( pkg => {
                    console.log(pkg)
                    setPkg(pkg)
                })
    })
    
    if (currentPkg === null ) return <></>
    return <AppInfoCon info={currentPkg} />
}

export const RealData = Template2.bind({})

RealData.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,

    }
}