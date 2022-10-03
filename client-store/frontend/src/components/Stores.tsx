import {useRef} from "react"
import useResize from "../hooks/useResize"
import Store from "./Store"
import { StoresProps } from "../interfaces/Stores"
import StoresStyle from "../assets/css/components/stores.module.css"
function Stores(props: StoresProps): JSX.Element {
  const parentDiv = useRef<HTMLDivElement>(null);    
  const {width : parentWidth} = useResize(parentDiv)
  const columnPerRow = Math.round((parentWidth - 100) / 160) 
  const isCenteredColumns = columnPerRow < 4  
  return (
    <div 
      className={StoresStyle["app-stores"]} 
      ref={parentDiv} 
      style={{
        gridTemplateColumns:`repeat(${columnPerRow},150px)`,
        justifyContent: isCenteredColumns ? 'center':'flex-start'
      }}>
      {props.stores?.map((details) => (
        <Store
          key={details.id}
          id={details.id}
          icon={details.icon}
          title={details.title}
          onClick={props.onStoreClick}
        />
      ))}
    </div>
  )
}
export default Stores
