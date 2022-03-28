import React, { useEffect } from 'react'
import { AppInfo, AppInfoProps } from '../components/AppInfo'

import { ComponentMeta } from '@storybook/react'
import { retrieveListing, installPackage } from '../actions/appLib'
import { useState } from '@storybook/addons'
import { PackageInfo } from '../data/packageInfo'

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
        percent: 0,
        isInstallable: true,
    },
}
export const Downloading = Template.bind({})

Downloading.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 30,
        processStatus: 'downloading',
    },
}
export const Installing = Template.bind({})

Installing.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 90,
        processStatus: 'installing',
    },
}
export const UnInstalling = Template.bind({})

UnInstalling.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 90,
        processStatus: 'uninstalling',
    },
}

export const Updatable = Template.bind({})

Updatable.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        isUpdatable: true,
    },
}
export const Launchable = Template.bind({})

Launchable.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        isUpdatable: true,
        isLaunchable: true,
    },
}
export const InstallationError = Template.bind({})

InstallationError.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,
        percent: 90,
        processStatus: 'error',
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

const Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       ']

export const WithStats = Template.bind({})

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
        stats: Labels.map(() => Math.random()),
        isService: true,
    },
}

const Template2 = (props: AppInfoProps) : JSX.Element => {
    const [currentPkg, setPkg] = useState(null)
    useEffect( () =>{
        retrieveListing("ela.sample")
            .then( pkg => {
                setPkg(pkg)
            })
    })
    const handleInstall = (pkg:PackageInfo) => {
        installPackage(pkg.id)
    }
    if (currentPkg === null ) return <></>
    return <AppInfo 
        info={currentPkg} 
        onInstall={handleInstall}/>
}

export const RealData = Template2.bind({})

RealData.args = {
    ...Primary.args,
    info: {
        ...Primary.args.info,

    }
}