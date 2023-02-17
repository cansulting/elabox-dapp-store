import {useRef} from "react"
import useResize from "../hooks/useResize"
import App, { AppProps } from "./App"
import AppsStyle from "../assets/css/components/apps.module.css"
import { PackageInfo } from "../data/packageInfo"

export interface AppsProps {
  apps: PackageInfo[]
  onSelected?: (selected:PackageInfo) => void
}

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
          <App key={app.id} id={app.id} title={app.name} icon={app.icon} />
        ))}
      </div>        
    </div>
}
export default Apps