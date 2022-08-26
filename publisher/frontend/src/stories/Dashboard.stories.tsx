import { ComponentMeta, ComponentStory } from "@storybook/react"
import { DashbordProps } from "../interfaces/dashboard"
import Dashboard from "../pages/Dashboard"

export default {
  title: "Publisher/Pages/Dashboard",
  component: Dashboard,
} as ComponentMeta<typeof Dashboard>
let tabIndex = 1
const DashboardData = {
  header: {
    tab: {
      index: tabIndex,
      selectTab: (index: number) => {
        tabIndex = index
      },
    },
    onSearch: (query: string) => {},
  },
  sidebar: {
    stores: [
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
    ],
    onAddApp: () => {},
  },
  body: {
    app: {
      profile: {
        name: "test app",
        packageId: "1000",
        description: "lorem test",
        icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png",
        onProfileSave: () => {},
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
        onAddUser: (username: string) => {},
      },
      release: {
        build: "1",
        updates:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, delectus laborum dolorem beatae quo rem cum veritatis iusto labore, maiores hic, provident veniam perspiciatis laboriosam inventore ipsum voluptates nesciunt reprehenderit.",
        onReleaseSave: () => {},
      },
    },
  },
}

const Template: ComponentStory<typeof Dashboard> = (props: DashbordProps) => {
  return <Dashboard {...props} />
}
export const DashboardWithDummyData = Template.bind({})

DashboardWithDummyData.args = {
  ...DashboardData,
}
