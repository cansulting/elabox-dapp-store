import { BuildInfo } from "../data/buildInfo"
import { PackageInfo } from "../data/packageInfo"

export interface BodyProps {
  tabIndex: number
  app?: PackageInfo
  builds: {
    [key:number]: BuildInfo
  }
  onApply?: (newpkg: PackageInfo) => void
  onUpload?: (buf: Buffer) => void
}
