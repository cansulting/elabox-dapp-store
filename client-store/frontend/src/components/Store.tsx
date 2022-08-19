import { StoreProps } from "../intefaces/Store"
import StoreStyle from "../assets/css/components/store.module.css"
function Store(props: StoreProps): JSX.Element {
  return (
    <div className={StoreStyle["app-store"]}>
      <div className={StoreStyle["app-store-body"]}>
        <img src={props.icon} alt={props.title} />
      </div>
      <div className={StoreStyle["app-store-footer"]}>
        <h3>{props.title}</h3>
      </div>
    </div>
  )
}

export default Store
