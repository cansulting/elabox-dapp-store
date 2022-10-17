import { PackageInfo } from "../data/packageInfo"
import StoreStyle from "../assets/css/components/store.module.css"
import IpfsImage from "./IpfsImage"
import { retrieveIconPath } from "../constants"

export interface StoreItemProps {
    info: PackageInfo
    onClick: (item:PackageInfo) => void
  }
  
function PackageItem(props: StoreItemProps) {
return (
    <div className={StoreStyle["app-store"]} 
        onClick={ _ => props.onClick(props.info)}>
    <IpfsImage hivePath={retrieveIconPath(props.info.id)}/>
    <h3>{props.info.name}</h3>
    </div>
)
}

export default PackageItem
  