import SideBarStyle from "../assets/css/components/sidebar.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import { SideBarProps } from "../interfaces/sidebar"
import Store from "./Store"
import React from "react"
function SideBar(props: SideBarProps): JSX.Element {
  const handleAddAppClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.onAddApp()
  }
  return (
    <div className={SideBarStyle["app-sidebar"]}>
      <div>
        {props.stores.map((store) => {
          return <Store {...store} />
        })}
      </div>
      <button className={ButtonStyle["ghost"]} onClick={handleAddAppClick}>
        Add NEW APP
      </button>
    </div>
  )
}

export default SideBar
