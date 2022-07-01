import React from 'react'
import { AppIcon, AppIconProps } from '../components/AppIcon'
import { ComponentMeta } from '@storybook/react'
export default {
    title: 'Elabox/components/AppIcon',
    component: AppIcon,
} as ComponentMeta<typeof AppIcon>

const Template = (props: AppIconProps): JSX.Element => <AppIcon {...props} />

export const WithLabel = Template.bind({})
WithLabel.args = {
    label: 'Glide',
    iconImg:
        'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
    width: '200px',
    height: '200px',
    percent: 0,
    iconOnly: false,
    isInstallable: false,
    className: '',
}
export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
    ...WithLabel.args,
    iconOnly: true,
}
export const Downloadable = Template.bind({})
Downloadable.args = {
    ...WithLabel.args,
    isInstallable: true,
}
export const Downloading = Template.bind({})
Downloading.args = {
    ...WithLabel.args,
    percent: 50,
    processStatus: 'downloading',
}
export const Notification = Template.bind({})
Notification.args = {
    ...WithLabel.args,
    notification: 10,
}
export const Installing = Template.bind({})
Installing.args = {
    ...WithLabel.args,
    percent: 50,
    processStatus: 'installing',
}
export const Uninstalling = Template.bind({})
Uninstalling.args = {
    ...WithLabel.args,
    percent: 50,
    processStatus: 'uninstalling',
}
export const ProcessError = Template.bind({})
ProcessError.args = {
    ...WithLabel.args,
    percent: 50,
    processStatus: 'error',
}
export const ProcessSuccess = Template.bind({})
ProcessSuccess.args = {
    ...WithLabel.args,
    isDownloading: true,
    percent: 100,
    processStatus: 'completed',
}
