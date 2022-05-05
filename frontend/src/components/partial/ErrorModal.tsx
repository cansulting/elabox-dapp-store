import React from 'react'

import { Button,Modal,ModalBody,ModalHeader,ModalFooter } from 'reactstrap'

export interface ErrorModalProps {
    message: string
    show: boolean
    onClose: () => void
}

export const ErrorModal = (props:ErrorModalProps) : JSX.Element => {
   return  <Modal centered isOpen={props.show}>
        <ModalHeader>
            Error Occured
        </ModalHeader>
        <ModalBody>
            <p style={{color:"red",textAlign:"center",marginTop:10}}>
                {props.message}
            </p>
        </ModalBody>
        <ModalFooter>
            <Button
            color="default"
            onClick={props.onClose}
            >
                Close
            </Button>
        </ModalFooter>
    </Modal>
}