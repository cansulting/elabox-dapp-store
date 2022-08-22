import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import { DashboardProps } from "../intefaces/Dashboard"
import Stores from "../components/Stores"
import ButtonStyle from "../assets/css/button.module.css"
function DashboardPage(props: DashboardProps): JSX.Element {
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-header"]}>
        <button className={ButtonStyle['ghost']} onClick={props.onExploreClick}>Explore Stores</button>
      </div>
      <h1>Popular</h1>
      <Stores stores={props.stores} onStoreClick={props.onStoreClick} />
      <h1>Latest</h1>
      <Stores stores={props.stores} onStoreClick={props.onStoreClick} />
    </div>
  )
}
export default DashboardPage
