import { PackageInfo } from "../data/packageInfo"

export interface ProfileProps {
  info: PackageInfo
  onProfileSave?: (newPkg:PackageInfo) => void
}
