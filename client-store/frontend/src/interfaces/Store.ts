import { AppProps } from "./App"

export interface StoreProps {
  id: string
  icon: string
  title: string
  description?: string
  apps?: AppProps[],
  onClick? : (id: string) => void
}
