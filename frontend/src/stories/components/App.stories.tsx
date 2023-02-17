import { ComponentMeta, ComponentStory } from '@storybook/react'
import App, { AppProps } from "../../components/App"

export default {
    title:"ClientStore/Components/App",
    component: App
} as ComponentMeta<typeof App>

const Template:ComponentStory<typeof App> = (props:AppProps) => {
    return <App {...props}/>
}

export const AppWithDummyData = Template.bind({})

AppWithDummyData.args={
    id:"1",
    title:"test",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png"
}