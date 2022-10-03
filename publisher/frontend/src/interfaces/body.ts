import { ProfileProps } from "./profile"
import { ReleaseProps } from "./release"
import { TestingProps } from "./testing"

export interface BodyProps {
  tabIndex: number
  app: {
    profile: ProfileProps
    testing: TestingProps
    release: ReleaseProps
  }
}
