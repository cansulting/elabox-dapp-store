import React, { useEffect, useState} from 'react'
import { AppDashboard, AppDashboardProps } from '../components/AppDashboard'
import { ComponentMeta } from '@storybook/react'
import { PackageInfo } from '../data/packageInfo'
import AppDashboardCon from '../container/AppDashboardCon'

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
    iconWidth: "200px",
    iconHeight: "200px"
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
export const InstallingApp = Template.bind({})

InstallingApp.args = {
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
            processStatus: 'installing',
            percent: 50,
        },
    ],
}
export const UninstallingApp = Template.bind({})

UninstallingApp.args = {
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
            processStatus: 'uninstalling',
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

const FetchRealdata = (props: any): JSX.Element => {
    const onClick = (app: PackageInfo) => {
        console.log("Selected " + app.id)
    }
    return  <AppDashboardCon onClick={onClick} apps={[]}/>
}

export const RealData = FetchRealdata.bind({})
RealData.args = {
    ...Primary.args,
    apps: null
}