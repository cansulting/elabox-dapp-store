import React, { useState, useRef } from "react"
import { Button } from "react-bootstrap"
import { PackageInfo } from "../data/packageInfo"
import HeaderStyle from "../assets/css/components/header.module.css"
import TabsStyle from "../assets/css/tabs.module.css"

export interface HeaderProps {
  tab?: {
    index: number
    onSelectTab: (index: number) => void
  }
  app: PackageInfo
  onSearch: (query: string) => void
  onSignout: () => void
}

function Tab(props:any) {
  return (
    <div
          className={
            `${ props.selected ? TabsStyle["tab-selected"] : ""}`
          }
          onClick={() => props.tab?.onSelectTab(props.index)}
        >
          {props.caption}
    </div>
  )
}

function Header(props: HeaderProps): JSX.Element {
  const [query, setQuery] = useState("")
  const queryFormRef = useRef<HTMLFormElement | null>(null)
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSearch(query)
  }
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  const handleQueryKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Enter") {
      if (queryFormRef.current) {
        queryFormRef.current.dispatchEvent(new Event("submit"))
      }
    }
  }
  return (
    <div className={HeaderStyle["app-header"]}>
      <div className={HeaderStyle["app-header-search"]}>
        <h1>dApp Developer</h1>
        <form method="POST" ref={queryFormRef} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="input-search"
            placeholder="Search"
            onChange={handleQueryChange}
            onKeyDown={handleQueryKeyPress}
            value={query}
          />
        </form>
        <Button onClick={props.onSignout}>Sign-out</Button>
      </div>
      {props.app && <div className={TabsStyle["tabs-control"]}>
        <Tab caption="App Profile" 
          index={0} 
          selected={props.tab?.index === 0} 
          tab={props.tab}/>
        <Tab caption="Build" 
          index={1} 
          selected={props.tab?.index === 1} 
          tab={props.tab}/>
        <Tab caption="Testing" 
          index={2} 
          selected={props.tab?.index === 2} 
          tab={props.tab}/>
        <Tab caption="Release" 
          index={3} 
          selected={props.tab?.index === 3} 
          tab={props.tab}/>
        <Tab caption="Config" 
          index={4} 
          selected={props.tab?.index === 4} 
          tab={props.tab}/>
      </div>}
    </div>
  )
}

export default Header
