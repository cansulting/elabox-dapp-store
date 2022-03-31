import React from 'react';
export interface AppButtonProps {
    id?: string;
    ref?: React.RefObject<any>;
    children: string | JSX.Element;
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    outline?: boolean;
    size: 'sm' | 'lg';
    block?: boolean;
    active?: boolean;
    close?: boolean;
    disabled?: boolean;
    isProcessing?: boolean;
    onClick?: Function;
}
export declare const AppButton: (props: AppButtonProps) => JSX.Element;
