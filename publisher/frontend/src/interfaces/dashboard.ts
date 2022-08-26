import { BodyProps } from "./body"
import { HeaderProps } from "./header"
import { SideBarProps } from "./sidebar"

export interface DashbordProps {
  header: HeaderProps
  sidebar: SideBarProps
  body: BodyProps
}
