import React, { useState, useRef } from "react"
import HeaderStyle from "../assets/css/components/header.module.css"
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
  )
}

export default Header
