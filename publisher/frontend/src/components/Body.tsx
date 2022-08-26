import { BodyProps } from "../interfaces/body"
import BodyStyle from "../assets/css/components/body.module.css"
import Profile from "./app/Profile"
import Testing from "./app/Testing"
import Release from "./app/Release"
function Body(props: BodyProps): JSX.Element {
  return (
    <div className={BodyStyle["app-body"]}>
      {props.tabIndex === 0 && <Profile {...props.app.profile} />}
      {props.tabIndex === 1 && <Profile {...props.app.profile} />}
      {props.tabIndex === 2 && <Testing {...props.app.testing} />}
      {props.tabIndex === 3 && <Release {...props.app.release} />}
    </div>
  )
}
export default Body
