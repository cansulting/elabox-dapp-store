import React from 'react'

import { Button, Spinner } from 'reactstrap'

export interface AppButtonProps {
    id?: string
    children: string | JSX.Element
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
    if (props.id?.length > 0) {
        return (
            <Button
                id={props.id}
                color={props.color}
                size={props.size}
                type="button"
            >
                {props.children}
            </Button>
        )
    } else {
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
}
