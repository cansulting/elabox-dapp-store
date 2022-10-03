import Apps from "../components/Apps"
import { StoreProps } from "../interfaces/Store"
import StoreStyle from "../assets/css/pages/store.module.css"
import ButtonStyle from "../assets/css/button.module.css"
function StoreDetailsPage(props:StoreProps): JSX.Element {
  return (
    <div className={StoreStyle["app-store"]}>
      <div className={StoreStyle["app-store-header"]}>
        <div className={StoreStyle["app-image-container"]}>
          <img src={props?.icon} alt={`${props?.title} icon`} />
        </div>
        <div className={StoreStyle["app-body"]}>
          <div className={StoreStyle["app-body-control"]}>
            <h1>{props?.title}</h1>
            <button className={`${ButtonStyle["primary"]}`}>Subscribe</button>
          </div>
          <p>{props?.description}</p>
        </div>
      </div>
      <Apps apps={props?.apps!}/>      
    </div>
  )
}

export default StoreDetailsPage
