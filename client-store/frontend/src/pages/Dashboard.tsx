import { Link } from "react-router-dom"
import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import Stores from "../components/Stores"
function DashboardPage(): JSX.Element {
  const storesData = [
    { id: "1", title: "test", icon: "test" },
    { id: "2", title: "test", icon: "test" },
    { id: "3", title: "test", icon: "test" },
  ]
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-header"]}>
        <Link to="/stores">Explore Stores</Link>
      </div>
      <h1>Popular</h1>
      <Stores stores={storesData} />
      <h1>Latest</h1>
      <Stores stores={storesData} />
    </div>
  )
}
export default DashboardPage
