import {useRef} from "react"
import useResize from "../hooks/useResize"
import Store from "./Store"
import { StoresProps } from "../intefaces/Stores"
import StoresStyle from "../assets/css/components/stores.module.css"
function Stores(props: StoresProps): JSX.Element {
  const parentDiv = useRef<HTMLDivElement>(null);    
  const {width : parentWidth} = useResize(parentDiv)
  const columnPerRow = Math.round((parentWidth - 100) / 150) 
  const isCenteredColumns = columnPerRow < 4  
  return (
    <div 
      className={StoresStyle["app-stores"]} 
      ref={parentDiv} 
      style={{
        gridTemplateColumns:`repeat(${columnPerRow},150px)`,
        justifyContent: isCenteredColumns ? 'center':'flex-start'
      }}>
      {props.stores.map((details) => (
        <Store
          key={details.id}
          id={details.id}
          icon="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-placeholder-hunting-kiranshastry-lineal-color-kiranshastry.png"
          title="Test"
          onClick={props.onStoreClick}
        />
      ))}
    </div>
  )
}
export default Stores
