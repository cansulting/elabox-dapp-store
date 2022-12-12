import React from 'react';
import { PackageInfo } from '../../../../data/packageInfo';
export interface DependencyModalProps {
    title?: string;
    dependencies: Array<PackageInfo>;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (e: React.MouseEvent) => void;
    style?: {
        modal?: object;
        header?: object;
        body?: object;
        footer?: object;
    };
}
export declare const DependencyModal: {
    (props: DependencyModalProps): JSX.Element;
    defaultProps: DependencyModalProps;
};
