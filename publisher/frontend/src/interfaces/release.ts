import { BuildInfo } from "../data/buildInfo"
import { ReleaseInfo } from "../data/releaseInfo"

export interface ReleaseProps {
  info: ReleaseInfo
  builds: {
    [key:number]: BuildInfo
  }
  onReleaseSave?: () => void
}
