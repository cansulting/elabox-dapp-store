import { UserProps } from "./user"

export interface TestingProps {
  enabled: boolean
  users: UserProps[]
  onAddUser: (usename: string) => void
}
