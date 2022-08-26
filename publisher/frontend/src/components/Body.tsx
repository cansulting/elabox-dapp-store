import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { BodyProps } from "../interfaces/body"
import BodyStyle from "../assets/css/components/body.module.css"
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
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
      </Tabs>
    </div>
  )
}
export default Body
