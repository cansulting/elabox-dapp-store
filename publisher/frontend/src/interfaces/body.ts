import { ProfileProps } from "./profile"
import { ReleaseProps } from "./release"
import { TestingProps } from "./testing"

export interface BodyProps {
  app: {
    profile: ProfileProps
    testing: TestingProps
    release: ReleaseProps
  }
}
