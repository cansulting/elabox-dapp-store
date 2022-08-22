import { StoreProps } from "../intefaces/Store"
import StoreStyle from "../assets/css/pages/store.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import App from "../components/App"
function StoreDetailsPage(props:StoreProps): JSX.Element {
  console.log(props)
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
      <h1>Apps</h1>
      <div className={StoreStyle["app-list"]}>
        {props?.apps?.map((app) => (
          <App key={app.id} id={app.id} title={app.title} icon={app.icon} />
        ))}
      </div>
    </div>
  )
}

export default StoreDetailsPage
