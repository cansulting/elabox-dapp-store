/// <reference types="react" />
import { PackageInfo } from "../../data/packageInfo";
export interface DashboardProps {
    apps: PackageInfo[];
    onSelected: (pkg: PackageInfo) => void;
    onExploreClick?: () => void;
}
declare function DashboardPage(props: DashboardProps): JSX.Element;
export default DashboardPage;
