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
const handleOnSearch = (query: string) => {}
export const HeaderWithDummyData = Template.bind({
  onSearch: handleOnSearch,
})

HeaderWithDummyData.args = {}
