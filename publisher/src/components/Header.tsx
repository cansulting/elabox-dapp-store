import HeaderStyle from "../assets/css/components/header.module.css"
import { HeaderProps } from "../interfaces/header"
function Header(props: HeaderProps): JSX.Element {
  return (
    <div className={HeaderStyle["app-header"]}>
      <h1>dApp Developer</h1>
      <form>
        <input type="text" name="input-search" placeholder="Search" />
      </form>
    </div>
  )
}

export default Header
