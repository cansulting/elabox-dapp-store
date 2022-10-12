import { ComponentMeta, ComponentStory } from "@storybook/react"
import Header, { HeaderProps } from "../../components/Header"

export default {
  title: "Publisher/Components/Header",
  component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (props: HeaderProps) => {
  return <Header {...props} />
}
let tabIndex = 1
const handleOnSearch = (query: string) => {}
export const HeaderWithDummyData = Template.bind({
  tab: {
    index: tabIndex,
    selectTab: (index: number) => {
      tabIndex = index
    },
  },
  onSearch: handleOnSearch,
  onSignout: () => {}
})

HeaderWithDummyData.args = {}
