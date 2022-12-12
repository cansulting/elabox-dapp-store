/// <reference types="react" />
import { PackageInfo } from "../data/packageInfo";
export interface StoreProps {
    id: string;
    icon: string;
    title: string;
    description?: string;
    apps?: PackageInfo[];
    onClick?: (id: string) => void;
}
declare function Store(props: StoreProps): JSX.Element;
export default Store;
