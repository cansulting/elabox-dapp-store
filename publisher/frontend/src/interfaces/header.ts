import { PackageInfo } from "../data/packageInfo"

export interface HeaderProps {
  tab?: {
    index: number
    onSelectTab: (index: number) => void
  }
  app: PackageInfo
  onSearch: (query: string) => void
}
