import { useState } from "react"
import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import Body from "../components/Body"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import { DashbordProps } from "../interfaces/dashboard"
function Dashboard(props: DashbordProps): JSX.Element {
  const [tabIndex, setTabIndex] = useState(0)
  const handleSelectTab = (index: number) => {
    setTabIndex(index)
  }
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <Header
          {...props.header}
          tab={{
            index: tabIndex,
            onSelectTab: handleSelectTab,
          }}
        />
      </div>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <SideBar {...props.sidebar} />
        <Body {...props.body} tabIndex={tabIndex} />
      </div>
    </div>
  )
}

export default Dashboard
