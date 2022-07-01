import { PackageInfo } from '../data/packageInfo';
export interface AppDashboardProps {
    apps: PackageInfo[];
    onClick?: (app: PackageInfo) => void;
    iconWidth?: number;
    iconHeight?: number;
    style?: object;
}
export declare const AppDashboard: (props: AppDashboardProps) => JSX.Element;
