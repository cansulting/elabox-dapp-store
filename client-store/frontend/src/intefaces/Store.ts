export interface StoreProps {
  id: string
  icon: string
  title: string
  description?: string
  apps?: []
}

export interface StoreDetailsProps {
  id: string
}
export type StoreDetailsParams = {
  id: string
}
