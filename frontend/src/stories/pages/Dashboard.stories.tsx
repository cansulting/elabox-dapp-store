import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AppStatus } from '../../utils/appStatus'
import DashboardPage, { DashboardProps } from '../../controllers/pages/Dashboard'
import { PackageInfo } from 'src/data/packageInfo'
export default {
    title:"ClientStore/Pages/Dashboard",
    component: DashboardPage,
} as ComponentMeta<typeof DashboardPage>

const storesData = [
    { 
        id: "1", 
        name: "test", 
        icon: "test", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
	    currentBuild : 1,
	    latestBuild : 1,
	    status: "installed" as AppStatus
    },
    { 
        id: "2", 
        name: "test", 
        icon: "test", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
	    currentBuild : 1,
	    latestBuild : 1,
	    status: "installed" as AppStatus
    },
    { 
        id: "3", 
        name: "test", 
        icon: "test", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
	    currentBuild : 1,
	    latestBuild : 1,
	    status: "installed" as AppStatus
    },
  ]
const handleStoreClick = (pkg: PackageInfo) => {

}
const handleOnExploreClick = () => {
    console.log("shown redirect to /store")
}
const Template:ComponentStory<typeof DashboardPage> = (props:DashboardProps):JSX.Element => {
    return <DashboardPage {...props}/>
}

export const DashboardDummyData = Template.bind({})

DashboardDummyData.args={
    apps : storesData,
    onSelected: handleStoreClick,
    onExploreClick: handleOnExploreClick
}