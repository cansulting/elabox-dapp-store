import React, { useState, useRef } from "react"
import HeaderStyle from "../assets/css/components/header.module.css"
import TabsStyle from "../assets/css/tabs.module.css"
import { HeaderProps } from "../interfaces/header"
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
      </div>
      {props.app && <div className={TabsStyle["tabs-control"]}>
        <div
          className={`${
            props.tab?.index === 0 ? TabsStyle["tab-selected"] : ""
          }`}
          onClick={() => props.tab?.onSelectTab(0)}
        >
          App Profile
        </div>
        <div
          className={`${
            props.tab?.index === 1 ? TabsStyle["tab-selected"] : ""
          }`}
          onClick={() => props.tab?.onSelectTab(1)}
        >
          Build
        </div>
        <div
          className={`${
            props.tab?.index === 2 ? TabsStyle["tab-selected"] : ""
          }`}
          onClick={() => props.tab?.onSelectTab(2)}
        >
          Testing
        </div>
        <div
          className={`${
            props.tab?.index === 3 ? TabsStyle["tab-selected"] : ""
          }`}
          onClick={() => props.tab?.onSelectTab(3)}
        >
          Release
        </div>
      </div>}
    </div>
  )
}

export default Header
