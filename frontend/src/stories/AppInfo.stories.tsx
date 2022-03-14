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
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        percent: 0,
        isInstallable: true,
    },
}
export const Downloading = Template.bind({})

Downloading.args = {
    ...Primary.args,
    info: {
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        percent: 30,
        processStatus: 'downloading',
    },
}
export const Installing = Template.bind({})

Installing.args = {
    ...Primary.args,
    info: {
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        percent: 90,
        processStatus: 'installing',
    },
}

export const InstallationError = Template.bind({})

InstallationError.args = {
    ...Primary.args,
    info: {
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        percent: 90,
        processStatus: 'error',
    },
}

export const InstallationSuccess = Template.bind({})

InstallationSuccess.args = {
    ...Primary.args,
    info: {
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        percent: 100,
        processStatus: 'completed',
    },
}

const Labels = ['       ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '       ']

export const WithStats = Template.bind({})

WithStats.args = {
    ...Primary.args,
    info: {
        label: 'Glide',
        iconImg: 'images/glide.png',
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        stats: Labels.map(() => Math.random()),
    },
}
