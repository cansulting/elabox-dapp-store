import React from 'react';
export interface ConfirmationModalProps {
    title: string;
    body: string;
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
export declare const ConfirmationModal: {
    (props: ConfirmationModalProps): JSX.Element;
    defaultProps: ConfirmationModalProps;
};
