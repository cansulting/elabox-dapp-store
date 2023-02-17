import AppStyle from "../assets/css/components/app.module.css"

export interface AppProps {
  id: string
  title: string
  icon: string
}

function App(props: AppProps): JSX.Element {
  return (
    <div className={AppStyle["app"]}>
      <div className={AppStyle["app-body"]}>
        <img src={props.icon} alt={props.title} />
      </div>
      <div className={AppStyle["app-footer"]}>
        <h3>{props.title}</h3>
      </div>
    </div>
  )
}

export default App
