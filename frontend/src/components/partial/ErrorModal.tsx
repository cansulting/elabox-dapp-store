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
            {props.message}
        </ModalBody>
        <ModalFooter>
            <Button
            color="danger"
            onClick={props.onClose}
            >
                Ok
            </Button>
        </ModalFooter>
    </Modal>
}