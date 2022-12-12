/// <reference types="react" />
import { StoreProps } from "./Store";
export interface StoresProps {
    stores: StoreProps[];
    onStoreClick: (id: string) => void;
}
declare function Stores(props: StoresProps): JSX.Element;
export default Stores;
