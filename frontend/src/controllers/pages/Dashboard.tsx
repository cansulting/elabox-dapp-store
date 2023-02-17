import DashboardStyle from "../../assets/css/pages/dashboard.module.css"
import Apps, { AppsProps } from "../../components/Apps"
import { PackageInfo } from "../../data/packageInfo"
import TopBar from "../../components/ui/TopBar"

export interface DashboardProps {
  apps : PackageInfo[]
  onSelected: (pkg : PackageInfo) => void
  onExploreClick?: () => void
}

function DashboardPage(props: DashboardProps): JSX.Element {
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <TopBar />
      <h1>Popular</h1>
      <Apps apps={props.apps} onSelected={props.onSelected} />
      <h1>Latest</h1>
      <Apps apps={props.apps} onSelected={props.onSelected} />
    </div>
  )
}
export default DashboardPage
