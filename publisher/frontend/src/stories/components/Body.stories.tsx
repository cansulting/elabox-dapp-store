import { ComponentMeta, ComponentStory } from "@storybook/react"
import Body from "../../components/Body"
import { BodyProps } from "../../interfaces/body"
export default {
  title: "Publisher/Components/Body",
  component: Body,
} as ComponentMeta<typeof Body>

const Template: ComponentStory<typeof Body> = (props: BodyProps) => {
  return <Body {...props} />
}

export const BodyWithDummyData = Template.bind({})

BodyWithDummyData.args = {}
