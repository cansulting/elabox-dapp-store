import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SettingsProps } from '../../interfaces/Settings'
import SettingsPage from "../../controllers/pages/Settings"

export default {
    title:"ClientStore/Pages/Settings",
    component: SettingsPage,
} as ComponentMeta<typeof SettingsPage>

const handleAddHub = (hub:string) => {

} 
const Template:ComponentStory<typeof SettingsPage> = (props:SettingsProps):JSX.Element => {
    return <SettingsPage {...props}/>
}

export const SettingsDummyData = Template.bind({})
SettingsDummyData.args={
    hubs:["www.test.com","www.test1.com","www.test2.com"],
    onAddHub: handleAddHub
}