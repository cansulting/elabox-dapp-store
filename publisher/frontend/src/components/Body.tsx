import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { BodyProps } from "../interfaces/body"
import BodyStyle from "../assets/css/components/body.module.css"
import Profile from "./app/Profile"
import Testing from "./app/Testing"
function Body(props: BodyProps): JSX.Element {
  return (
    <div className={BodyStyle["app-body"]}>
      <Tabs>
        <TabList>
          <Tab>App Profile</Tab>
          <Tab>Builds</Tab>
          <Tab>Testing</Tab>
          <Tab>Release</Tab>
        </TabList>
        <TabPanel>
          <Profile {...props.app.profile} />
        </TabPanel>
        <TabPanel>
          <h2>Builds</h2>
        </TabPanel>
        <TabPanel>
          <Testing {...props.app.testing} />
        </TabPanel>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default Body