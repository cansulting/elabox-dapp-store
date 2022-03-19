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
    onClick?: Function
}
export const AppButton = (props: AppButtonProps): JSX.Element => {
    if (props.isProcessing) {
        return (
            <Button
                {...props}
                onClick={(e) => {
                    e.preventDefault()
                    props.onClick()
                }}
            >
                <Spinner children="" />
            </Button>
        )
    } else {
        return (
            <Button
                {...props}
                onClick={(e) => {
                    e.preventDefault()
                    props.onClick()
                }}
            >
                {props.children}
            </Button>
        )
    }
}
