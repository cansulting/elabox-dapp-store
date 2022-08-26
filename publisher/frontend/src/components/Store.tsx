import StoreStyle from "../assets/css/components/store.module.css"
import { StoreProps } from "../interfaces/Store"

function Store(props: StoreProps) {
  return (
    <div className={StoreStyle["app-store"]}>
      <img src={props.icon} alt={`${props.name} Icon`} />
      <h2>{props.name}</h2>
    </div>
  )
}

export default Store
