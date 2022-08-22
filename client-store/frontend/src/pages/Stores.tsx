import StoresStyle from "../assets/css/pages/stores.module.css"
import Stores from "../components/Stores"
import { StoresProps } from "../intefaces/Stores"
function StoresPage(props:StoresProps): JSX.Element {
  return (
    <div className={StoresStyle["app-stores"]}>
      <h1>Explore</h1>
      <Stores stores={props.stores} />
    </div>
  )
}

export default StoresPage
