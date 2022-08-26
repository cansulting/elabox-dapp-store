import { ComponentMeta, ComponentStory } from "@storybook/react"
import Body from "../../components/Body"
import { BodyProps } from "../../interfaces/body"
export default {
  title: "Publisher/Components/Body",
  component: Body,
} as ComponentMeta<typeof Body>

const handleProfileSave = () => {}
const handleAddUser = (username: string) => {}
const handleReleaseSave = () => {}
const App = {
  profile: {
    name: "test app",
    packageId: "1000",
    description: "lorem test",
    icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
    onProfileSave: handleProfileSave,
  },
  testing: {
    enabled: true,
    users: [
      {
        id: "1",
        name: "testing user",
      },
      {
        id: "2",
        name: "testing user 1",
      },
    ],
    onAddUser: handleAddUser,
  },
  release: {
    build: "1",
    updates:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, delectus laborum dolorem beatae quo rem cum veritatis iusto labore, maiores hic, provident veniam perspiciatis laboriosam inventore ipsum voluptates nesciunt reprehenderit.",
    onReleaseSave: handleReleaseSave,
  },
}
const Template: ComponentStory<typeof Body> = (props: BodyProps) => {
  return <Body {...props} />
}

export const BodyWithDummyData = Template.bind({})

BodyWithDummyData.args = {
  app: App,
}
