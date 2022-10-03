import { StoreProps } from "./Store"
export interface DashboardProps {
    stores : StoreProps[]
    onStoreClick: (id : string) => void
    onExploreClick?: () => void
}