import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import Body from "../components/Body"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import { DashbordProps } from "../interfaces/dashboard"
function Dashboard(props: DashbordProps): JSX.Element {
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <Header {...props.header} />
      </div>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <SideBar {...props.sidebar} />
        <Body {...props.body} />
      </div>
    </div>
  )
}

export default Dashboard
