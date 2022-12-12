/// <reference types="react" />
import { PackageInfo } from "../data/packageInfo";
export interface AppsProps {
    apps: PackageInfo[];
    onSelected?: (selected: PackageInfo) => void;
}
declare function Apps(props: AppsProps): JSX.Element;
export default Apps;
