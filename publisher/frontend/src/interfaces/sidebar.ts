import { PackageInfo } from "../data/packageInfo"

export interface SideBarProps {
  stores?: PackageInfo[]
  onAddApp: () => void
}
