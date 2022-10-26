import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AppStatus } from '../../utils/appStatus'
import Apps, { AppsProps } from '../../components/Apps'

export default {
    title:"ClientStore/Components/Apps",
    component: Apps
} as ComponentMeta<typeof Apps>

const AppsList = [
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
}]

const Template:ComponentStory<typeof Apps> = (props:AppsProps) => {
    return <Apps {...props}/>
}

export const AppsWithDummyData = Template.bind({})

AppsWithDummyData.args={
    apps: AppsList
}