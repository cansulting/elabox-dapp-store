import { ProfileProps } from "./profile"
import { TestingProps } from "./testing"

export interface BodyProps {
  app: {
    profile: ProfileProps
    testing: TestingProps
  }
}
