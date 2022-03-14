import React from 'react'

import { Button, Spinner } from 'reactstrap'

export interface AppButtonProps {
    children: string
    color:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'light'
        | 'dark'
    outline?: boolean
    size: 'sm' | 'lg'
    block?: boolean
    active?: boolean
    close?: boolean
    disabled?: boolean
    isProcessing?: boolean
}
export const AppButton = (props: AppButtonProps): JSX.Element => {
    if (props.isProcessing) {
        return (
            <Button {...props}>
                <Spinner children="" />
            </Button>
        )
    } else {
        return <Button {...props}>{props.children}</Button>
    }
}
