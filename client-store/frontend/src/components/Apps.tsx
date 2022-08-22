import {useRef} from "react"
import useResize from "../hooks/useResize"
import App from "./App"
import { AppsProps } from "../intefaces/Apps"
import AppsStyle from "../assets/css/components/apps.module.css"
function Apps(props:AppsProps) : JSX.Element{
    const parentDiv = useRef<HTMLDivElement>(null);    
    const {width : parentWidth} = useResize(parentDiv)
    const columnPerRow = Math.round((parentWidth - 100) / 160) 
    const isCenteredColumns = columnPerRow < 4      
    return <div className={AppsStyle['apps']}>
      <h1>Apps</h1>
      <div className={AppsStyle["apps-list"]}
      ref={parentDiv} 
      style={{
        gridTemplateColumns:`repeat(${columnPerRow},150px)`,
        justifyContent: isCenteredColumns ? 'center':'flex-start'
      }}      
      >
        {props?.apps?.map((app) => (
          <App key={app.id} id={app.id} title={app.title} icon={app.icon} />
        ))}
      </div>        
    </div>
}
export default Apps