import { StoreProps } from "../interfaces/Store"
import StoreStyle from "../assets/css/components/store.module.css"
import React from "react"
function Store(props: StoreProps): JSX.Element {
  const handleStoreClick = (event: React.MouseEvent<HTMLElement>): void => {
    if(props.onClick !== undefined){
      props.onClick(props.id)
    }
  }
  return (
    <div className={StoreStyle["app-store"]} onClick={handleStoreClick}>
      <div className={StoreStyle["app-store-body"]}>
        <img src={props?.icon} alt={props?.title} />
      </div>
      <div className={StoreStyle["app-store-footer"]}>
        <h3>{props?.title}</h3>
      </div>
    </div>
  )
}

export default Store
