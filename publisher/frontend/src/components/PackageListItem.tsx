import { PackageInfo } from "../data/packageInfo"
import StoreStyle from "../assets/css/components/store.module.css"

export interface StoreItemProps {
    info: PackageInfo
    onClick: (item:PackageInfo) => void
  }
  
function PackageItem(props: StoreItemProps) {
return (
    <div className={StoreStyle["app-store"]} 
        onClick={ _ => props.onClick(props.info)}>
    <img src={props.info.iconcid} alt={`${props.info.name} Icon`} />
    <h3>{props.info.name}</h3>
    </div>
)
}

export default PackageItem
  