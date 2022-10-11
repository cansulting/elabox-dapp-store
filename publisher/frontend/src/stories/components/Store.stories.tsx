import { ComponentMeta, ComponentStory } from "@storybook/react"
import { StoreInfo } from "../../data/storeInfo"
import Store from "../../components/Store"
export default {
  title: "Publisher/Components/Store",
  component: Store,
} as ComponentMeta<typeof Store>

const Template: ComponentStory<typeof Store> = (props: StoreInfo) => {
  return <Store {...props} />
}
export const StoreWithDummyData = Template.bind({})

StoreWithDummyData.args = {
  id: "1",
  iconcid: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
  name: "Store 1",
}
