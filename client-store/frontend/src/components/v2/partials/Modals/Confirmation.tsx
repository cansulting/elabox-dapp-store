import React from 'react'

import { Modal,ModalHeader,ModalBody,ModalFooter,Button } from 'react-bootstrap'

export interface ConfirmationModalProps {
    title: string
    body: string
    isOpen: boolean
    onClose: () => void
    onConfirm : (e:React.MouseEvent) => void
    style?: {
        modal?: object
        header?: object
        body?: object
        footer?: object
    }
}
const defaultProps:ConfirmationModalProps={
    title:"",
    body:"",
    isOpen:false,
    onClose: () =>{},
    onConfirm: e=>{},
    style:{
        modal:{
            color:"white"
        },
        header:{
            backgroundColor:"#212529",                        
        },
        body:{
            backgroundColor:"#212529",
        },
        footer:{
            backgroundColor:"#212529",
        }
    }
}
export const ConfirmationModal = (props:ConfirmationModalProps): JSX.Element =>{
    return  <Modal
    centered
    style={props.style.modal}
    isOpen={props.isOpen}
    toggle={props.onClose}

  >
    <ModalHeader style={props.style.header}>
        {props.title}
    </ModalHeader>
    <ModalBody style={props.style.body}> 
        {props.body}
    </ModalBody>
    <ModalFooter style={props.style.footer}> 
      <Button
        color="danger"
        onClick={props.onConfirm}
      >
       Yes
      </Button>
      {' '}
      <Button onClick={props.onClose}>
        No
      </Button>
    </ModalFooter>
  </Modal>
}

ConfirmationModal.defaultProps = defaultProps;