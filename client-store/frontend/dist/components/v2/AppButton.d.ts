import React from 'react';
export interface AppButtonProps {
    id?: string;
    ref?: React.RefObject<any>;
    children: any;
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    outline?: boolean;
    size: 'sm' | 'lg';
    block?: boolean;
    active?: boolean;
    close?: boolean;
    disabled?: boolean;
    isProcessing?: boolean;
    onClick?: Function;
    [x: string]: unknown;
}
export declare const AppButton: (props: AppButtonProps) => JSX.Element;
