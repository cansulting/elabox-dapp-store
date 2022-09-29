import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DashboardProps } from '../../interfaces/Dashboard'
import DashboardPage from '../../pages/Dashboard'
export default {
    title:"ClientStore/Pages/Dashboard",
    component: DashboardPage,
} as ComponentMeta<typeof DashboardPage>
const storesData = [
    { id: "1", title: "test", 
        icon: "test", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
    },
    { id: "2", title: "test",
        icon: "test", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  },
    { id: "3", title: "test", 
        icon: "test", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."     
     },
  ]
const handleStoreClick = (id:string) => {

}
const handleOnExploreClick = () => {
    console.log("shown redirect to /store")
}
const Template:ComponentStory<typeof DashboardPage> = (props:DashboardProps):JSX.Element => {
    return <DashboardPage {...props}/>
}

export const DashboardDummyData = Template.bind({})

DashboardDummyData.args={
    stores : storesData,
    onStoreClick: handleStoreClick,
    onExploreClick: handleOnExploreClick
}