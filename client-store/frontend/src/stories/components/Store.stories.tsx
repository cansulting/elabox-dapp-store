import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StoreProps } from '../../interfaces/Store'
import Store from "../../components/Store"

export default {
    title:"ClientStore/Components/Store",
    component: Store
} as ComponentMeta<typeof Store>

const Template:ComponentStory<typeof Store> = (props:StoreProps) => {
    return <Store {...props}/>
}
const handleOnClick = (id:string) => {

}
export const StoreWithDummyData = Template.bind({})

StoreWithDummyData.args={
    id:"1",
    title:"test",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    onClick: handleOnClick
}