import SideBarStyle from "../assets/css/components/sidebar.module.css"
import { SideBarProps } from "../interfaces/sidebar"
import Store from "./Store"
function SideBar(props: SideBarProps): JSX.Element {
  return (
    <div className={SideBarStyle["app-sidebar"]}>
      {props.stores.map((store) => {
        return <Store {...store} />
      })}
    </div>
  )
}

export default SideBar
