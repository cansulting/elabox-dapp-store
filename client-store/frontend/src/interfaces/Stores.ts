import { StoreProps } from "./Store"
export interface StoresProps {
  stores: StoreProps[],
  onStoreClick :  (id:string) => void
}
