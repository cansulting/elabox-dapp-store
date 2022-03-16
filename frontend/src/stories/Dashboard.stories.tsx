import React from 'react'
import { AppDashboard, AppDashboardProps } from '../components/AppDashboard'
import { ComponentMeta } from '@storybook/react'

export default {
    title: 'Elabox/components/AppDashboard',
    component: AppDashboard,
} as ComponentMeta<typeof AppDashboard>

const Template = (props: AppDashboardProps): JSX.Element => (
    <AppDashboard {...props} />
)

export const Primary = Template.bind({})

Primary.args = {
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
    ],
    style: { width: '50%' },
}

export const DownloadableApp = Template.bind({})

DownloadableApp.args = {
    ...Primary.args,
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            isInstallable: true,
        },
    ],
}

export const DownloadingApp = Template.bind({})

DownloadingApp.args = {
    ...Primary.args,
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'downloading',
            percent: 50,
        },
    ],
}

export const ErrorDownloadingApp = Template.bind({})

ErrorDownloadingApp.args = {
    ...Primary.args,
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'error',
            percent: 70,
        },
    ],
}

export const CompleteDownloadingApp = Template.bind({})

CompleteDownloadingApp.args = {
    ...Primary.args,
    apps: [
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
        },
        {
            height: '100%',
            width: '100%',
            iconImg:
                'https://i.picsum.photos/id/628/200/200.jpg?hmac=iI5Sx7kEQEboYw_QKjCo-GsB_EyIcdl7LYnW-EbgEqg',
            label: 'Glide',
            processStatus: 'completed',
            percent: 100,
        },
    ],
}
