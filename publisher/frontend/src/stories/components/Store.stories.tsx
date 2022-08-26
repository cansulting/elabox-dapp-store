import { ComponentMeta, ComponentStory } from "@storybook/react"
import Store from "../../components/Store"
import { StoreProps } from "../../interfaces/Store"
export default {
  title: "Publisher/Components/Store",
  component: Store,
} as ComponentMeta<typeof Store>

const Template: ComponentStory<typeof Store> = (props: StoreProps) => {
  return <Store {...props} />
}
export const StoreWithDummyData = Template.bind({})

StoreWithDummyData.args = {
  id: "1",
  icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
  name: "Store 1",
}
