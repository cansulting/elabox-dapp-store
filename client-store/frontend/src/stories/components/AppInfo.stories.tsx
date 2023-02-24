import React, { useEffect } from 'react'

import "../../assets/css/index.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from '@storybook/addons'
import { AppInfo, AppInfoProps } from '../../components/v2'
import { retrieveListing } from '../../api/store'
import { AppInfoCon } from '../../controllers/v2'

export default {
    title: 'Elabox/components/AppInfo',
    component: AppInfo,
} as ComponentMeta<typeof AppInfo>

const Template: ComponentStory<typeof AppInfo> = (props: AppInfoProps) => <AppInfo {...props} />

export const Primary = Template.bind({})

Primary.args = {
    info: {
        "name": "Sample App",
        "id": "ela.sample",
        "description": "This is sample app",
        "icon" : "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/vvtuyg7ay25uziwmpeac",
        "updates": "This is updates",
        "currentBuild": 3,
        "latestBuild": 3,
        "version": "0.1.0",
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
        status:"uninstalled",
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
        progress: 90,
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
        progress: 100,
        status: 'installed',
    },
}
export const Syncing = Template.bind({})

Syncing.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        progress: 20,
        status: 'syncing',
    },
}

const TemplateStats: ComponentStory<typeof AppInfo> = (props: AppInfoProps) => {
    const stats = Labels.map(() => Math.random())
    return ( <AppInfo {...props} />) 
}
const Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       ']

export const WithStats = TemplateStats.bind({})

WithStats.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        isService: true,
    },
    footer: (
        <>
            <h4>Application Details</h4>
            <p>IP: 192.168.18.70</p>
        </>
    ),
}

const Template2: ComponentStory<typeof AppInfoCon> = (props: AppInfoProps) : JSX.Element => {
    const [currentPkg, setPkg] = useState(null)
    useEffect( () =>{
        if (currentPkg === null)
            retrieveListing ("trinity.pasar")
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