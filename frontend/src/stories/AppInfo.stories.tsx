import React from 'react'
import { AppInfo, AppInfoProps } from '../components/AppInfo'

import { ComponentMeta } from '@storybook/react'

export default {
    title: 'Elabox/components/AppInfo',
    component: AppInfo,
} as ComponentMeta<typeof AppInfo>

const Template = (props: AppInfoProps): JSX.Element => <AppInfo {...props} />

export const Primary = Template.bind({})

Primary.args = {
    info: {
        label: 'Glide',
        iconImg:
            'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
        package: {
            id: '10001',
            version: '1.0.0',
            build: '1.0.1',
        },
        body: (
            <>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </>
        ),
        footer: <></>,
        percent: 0,
        isInstallable: false,
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
        body: (
            <>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <h4>What's new</h4>
                <ul>
                    <li>Lorem lorem</li>
                    <li>Lorem lorem</li>
                </ul>
            </>
        ),
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
