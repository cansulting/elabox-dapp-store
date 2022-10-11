import { StoreInfo } from "../data/storeInfo"
import StoreStyle from "../assets/css/components/store.module.css"

function Store(props: StoreInfo) {
  return (
    <div className={StoreStyle["app-store"]}>
      <img src={props.iconcid} alt={`${props.name} Icon`} />
      <h3>{props.name}</h3>
    </div>
  )
}

export default Store
