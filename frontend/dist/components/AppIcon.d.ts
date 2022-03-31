import { PackageInfo } from "../data/packageInfo";
export interface AppIconProps {
    className?: string;
    package: PackageInfo;
    width?: string;
    height?: string;
    onClick?: (app: PackageInfo) => void;
}
export declare const AppIcon: (props: AppIconProps) => JSX.Element;
