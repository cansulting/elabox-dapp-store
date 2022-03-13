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
    iconImg: 'images/glide.png',
    width: '200px',
    height: '200px',
    percent: 0,
    iconOnly: false,
    isDownloadable: false,
}
export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
    ...WithLabel.args,
    iconOnly: true,
}
export const Downloadable = Template.bind({})
Downloadable.args = {
    ...WithLabel.args,
    isDownloadable: true,
}
export const Downloading = Template.bind({})
Downloading.args = {
    ...WithLabel.args,
    percent: 50,
    downloadStatus: 'downloading',
}
export const DownloadError = Template.bind({})
DownloadError.args = {
    ...WithLabel.args,
    percent: 50,
    downloadStatus: 'error',
}
export const DownloadSuccess = Template.bind({})
DownloadSuccess.args = {
    ...WithLabel.args,
    isDownloading: true,
    percent: 100,
    downloadStatus: 'completed',
}
