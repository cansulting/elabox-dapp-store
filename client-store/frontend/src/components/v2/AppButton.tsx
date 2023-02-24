import React from 'react'

import { Button, Spinner } from 'react-bootstrap'

export interface AppButtonProps {
    id?: string
    ref?: React.RefObject<any>
    children: any
    color?:
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
    [x:string]:unknown
}
export const AppButton = (props: AppButtonProps): JSX.Element => {
    if (props.isProcessing) {
        return (
            <Button
                {...props}
                onClick={(e:any) => {
                    e.preventDefault()
                    props.onClick()
                }}
            >
                <Spinner children="" animation={'border'} />
            </Button>
        )
    } else {
        return (
            <Button
                style={{width:'80px',height:'35px'}}
                {...props}
                onClick={(e:any) => {
                    e.preventDefault()
                    props.onClick()
                }}
            >
                {props.children}
            </Button>
        )
    }
}
