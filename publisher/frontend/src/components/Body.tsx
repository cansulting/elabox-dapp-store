import BodyStyle from "../assets/css/components/body.module.css"
import Profile from "./app/Profile"
import Testing from "./app/Testing"
import Release from "./app/Release"
import { PackageInfo } from "../data/packageInfo"
import Build from "./app/Build"

import { BuildList } from "../data/buildInfo"
import { ReleaseInfo } from "../data/releaseInfo"
import Config from "./app/Config"

export interface BodyProps {
  tabIndex: number
  app?: PackageInfo
  retrieveBuilds: () => Promise<BuildList>
  onUpdateProfile?: (newpkg: PackageInfo) => void
  // called when build was uploaded
  onUpload?: (buf: Buffer, packageInfo: any) => void
  onReleaseProd?: (release: ReleaseInfo) => void
  onDeletePackage: (pkg: PackageInfo) => void
}

function EmptyPackage(props: any) {
  return <div>"CREATE NEW APP"</div>
} 

function Body(props: BodyProps): JSX.Element {
  const onApplyChanges = (updatedPackage:PackageInfo) => {
    if (props.onUpdateProfile)
      props.onUpdateProfile(updatedPackage)
  }
  return (
    <div className={BodyStyle["app-body"]}>
      {props.app && props.tabIndex === 0 && 
        <Profile info={props.app} onProfileSave={onApplyChanges}/>}
      {props.app && props.tabIndex === 1 && 
        <Build info={props.app} onUpload={props.onUpload} retrieveBuilds={props.retrieveBuilds}/>}
      {/*props.app && props.tabIndex === 2 && <Testing {...props.app} />*/}
      {props.app && props.tabIndex === 3 && 
        <Release 
          packageId={props.app.name}
          retrieveBuilds={props.retrieveBuilds} 
          info={props.app.release} 
          onReleaseSave={props.onReleaseProd}/>}
      {props.app && props.tabIndex === 4 && 
        <Config pkg={props.app} onDeletePackage={props.onDeletePackage}/>}
      {!props.app && <EmptyPackage />}
    </div>
  )
}
export default Body
