import {useRef} from "react"
import { Link } from "react-router-dom"
import useResize from "../hooks/useResize"
import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import { DashboardProps } from "../intefaces/Dashboard"
import Stores from "../components/Stores"
function DashboardPage(props: DashboardProps): JSX.Element {
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-header"]}>
        <Link to="/stores">Explore Stores</Link>
      </div>
      <h1>Popular</h1>
      <Stores stores={props.stores} onStoreClick={props.onStoreClick} />
      <h1>Latest</h1>
      <Stores stores={props.stores} onStoreClick={props.onStoreClick} />
    </div>
  )
}
export default DashboardPage
