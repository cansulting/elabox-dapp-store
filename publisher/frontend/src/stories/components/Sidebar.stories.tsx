import { ComponentMeta, ComponentStory } from "@storybook/react"
import SideBar, { SideBarProps } from "../../components/Sidebar"

export default {
  title: "Publisher/Components/SideBar",
  component: SideBar,
} as ComponentMeta<typeof SideBar>

const storesData = [
  {
    id: "1",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    name: "Store 1",
  },
  {
    id: "2",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    name: "Store 2",
  },
]
const handleAddApp = () => {}
const Template: ComponentStory<typeof SideBar> = (props: SideBarProps) => {
  return <SideBar {...props} />
}

export const SideBarWithDummyData = Template.bind({
  stores: storesData,
  onAddApp: handleAddApp,
})

SideBarWithDummyData.args = {}
