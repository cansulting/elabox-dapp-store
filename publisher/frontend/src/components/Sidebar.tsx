import SideBarStyle from "../assets/css/components/sidebar.module.css"
import PackageListItem from "./PackageListItem"
import { PackageInfo } from "../data/packageInfo"
import AddPackageModal from "./modals/AddPackageModal"

export interface SideBarProps {
  storeId: string
  packages?: PackageInfo[]
  onAddApp: (pkid: string, pkname: string) => void
  onAppSelected: (pkg: PackageInfo) => void
}

function SideBar(props: SideBarProps): JSX.Element {
  return (
    <div className={SideBarStyle["app-sidebar"]}>
      <div>
        {props.packages.map((pkg) => {
          return <PackageListItem info={pkg} onClick={props.onAppSelected}/>
        })}
      </div>
      <AddPackageModal {...props}/>
    </div>
  )
}

export default SideBar
