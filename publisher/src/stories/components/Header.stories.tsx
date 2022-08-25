import { ComponentMeta, ComponentStory } from "@storybook/react"
import Header from "../../components/Header"
import { HeaderProps } from "../../interfaces/header"

export default {
  title: "Publisher/Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (props: HeaderProps) => {
  return <Header {...props} />
}
export const HeaderWithDummyData = Template.bind({})

HeaderWithDummyData.args = {}
