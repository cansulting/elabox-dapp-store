import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import AllViewDashboard from '../../controllers/v2/AllViewDashboard'
import { AppInfoCon } from '../../controllers/v2'
import { PackageInfo } from '../../data'
import { AppDashboard, AppDashboardProps } from '../../components/v2'

export default {
    title: 'Elabox/components/AppDashboard',
    component: AppDashboard,
} as ComponentMeta<typeof AppDashboard>

const Template : ComponentStory<typeof AppDashboard> = (props: AppDashboardProps): JSX.Element => (
    <AppDashboard {...props} />
)

export const Primary = Template.bind({})

Primary.args = {
    apps: [
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status:"installed",
        },
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status:"installed",
        },
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status:"installed",
        },
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status:"installed",
        }
    ],
    style: { width: '50%' },
}

export const DownloadableApp : ComponentStory<typeof AppDashboard> = Template.bind({})

DownloadableApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            status:"uninstalled",
        }
    ],
}

export const DownloadingApp : ComponentStory<typeof AppDashboard> = Template.bind({})

DownloadingApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            progress:50,
            status:"downloading",
        }
    ],
}
export const InstallingApp : ComponentStory<typeof AppDashboard> = Template.bind({})

InstallingApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 0,
            latestBuild: 3,
            progress: 90,
            status: 'installing',
        }
    ],
}
export const UninstallingApp : ComponentStory<typeof AppDashboard> = Template.bind({})

UninstallingApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            status: 'uninstalling',
        }
    ],
}

export const ErrorDownloadingApp : ComponentStory<typeof AppDashboard> = Template.bind({})

ErrorDownloadingApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            progress: 90,
            status: 'error',
            notificationContents: [{
                content: "This is a sample error",
                type: "error"
            }]
        }
    ],
}

export const CompleteDownloadingApp : ComponentStory<typeof AppDashboard> = Template.bind({})

CompleteDownloadingApp.args = {
    ...Primary.args,
    apps: [
        ...Primary.args.apps,
        {
            icon:'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
            name: 'Glide',
            id: 'glide',
            currentBuild: 3,
            latestBuild: 3,
            progress: 90,
            status: 'error',
            notificationContents: [{
                content: "This is a sample error",
                type: "error"
            }]
        }
    ],
}

const FetchRealdata = (props: any): JSX.Element => {
    const [activeApp, setActiveApp] = React.useState(null)
    const onClick = (app: PackageInfo) => {
        console.log("Selected " + app.id)
        setActiveApp(app)
    }
    const onBack = () => {
        setActiveApp(null)
    }
    return  (<BrowserRouter >
            <div style={{width:"100%",backgroundColor:"#1E1E26",color:"white",padding:20}}>
                {!activeApp && <AllViewDashboard iconWidth={130} iconHeight={130} onClick={onClick} apps={[]}/>}
                {activeApp && <AppInfoCon info={activeApp} onBack={onBack}/>}        
            </div>
        </BrowserRouter>)
}

export const RealData : ComponentStory<typeof AppDashboard> = FetchRealdata.bind({})
RealData.args = {
    ...Primary.args,
    apps: null
}