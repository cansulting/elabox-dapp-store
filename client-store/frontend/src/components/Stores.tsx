import Store from "./Store"
import { StoresProps } from "../intefaces/Stores"
import StoresStyle from "../assets/css/components/stores.module.css"
function Stores(props: StoresProps): JSX.Element {
  return (
    <div className={StoresStyle["app-stores"]}>
      {props.stores.map((details) => (
        <Store
          key={details.id}
          id={details.id}
          icon="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png"
          title="Test"
        />
      ))}
    </div>
  )
}
export default Stores
