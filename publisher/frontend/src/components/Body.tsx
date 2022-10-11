import { BodyProps } from "../interfaces/body"
import BodyStyle from "../assets/css/components/body.module.css"
import Profile from "./app/Profile"
import Testing from "./app/Testing"
import Release from "./app/Release"
import { PackageInfo } from "../data/packageInfo"
import Build from "./app/Build"

function EmptyPackage(props: any) {
  return <div>"CREATE NEW APP"</div>
} 

function Body(props: BodyProps): JSX.Element {
  const onApplyChanges = (updatedPackage:PackageInfo) => {
    if (props.onApply)
      props.onApply(updatedPackage)
  }
  return (
    <div className={BodyStyle["app-body"]}>
      {props.app && props.tabIndex === 0 && <Profile info={props.app} onProfileSave={onApplyChanges}/>}
      {props.app && props.tabIndex === 1 && <Build onUpload={props.onUpload}/>}
      {/*props.app && props.tabIndex === 2 && <Testing {...props.app} />*/}
      {props.app && props.tabIndex === 3 && <Release builds={props.builds} info={props.app.release} />}
      {!props.app && <EmptyPackage />}
    </div>
  )
}
export default Body
