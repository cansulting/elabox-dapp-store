import { ComponentMeta, ComponentStory } from '@storybook/react'
import Stories, { StoresProps } from "../../components/Stores"
export default {
    title:"ClientStore/Components/Stories",
    component: Stories
} as ComponentMeta<typeof Stories>
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
const handleStoreClick = ( id: string)=>{

}
const Template:ComponentStory<typeof Stories> = (props:StoresProps) => {
    return <Stories {...props}/>
}

export const AppWithDummyData = Template.bind({})

AppWithDummyData.args={
    stores: storesData,
    onStoreClick: handleStoreClick
}