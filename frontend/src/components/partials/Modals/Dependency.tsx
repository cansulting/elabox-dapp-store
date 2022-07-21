import React from 'react'

import { Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import { AppButton } from '../../AppButton'

export interface DependencyModalProps {
    title?: string
    dependencies: Array<any>
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
const defaultProps:DependencyModalProps={
    title:"",
    dependencies:[],
    isOpen:false,
    onClose: () =>{},
    onConfirm: e=>{},
    style:{
        modal:{
            color:"white"
        },
        header:{
            backgroundColor:"#212529",    
            display: "none",                    
        },
        body:{
            backgroundColor:"#212529",
            textAlign:"center"
        },
        footer:{
            backgroundColor:"#212529",
            border: "none",
        }
    }
}
export const DependencyModal = (props:DependencyModalProps): JSX.Element =>{
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
        <h4>Install Dependencies?</h4>    
        <div className='d-flex justify-content-center' style={{ gap:10,marginTop:"5vh" }}>
            {props.dependencies.map(app => {
                return <div>
                        <img
                            src={app.info.icon}
                            alt={app.info.name}
                            style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: 10,
                            }}
                        />    
                        <p>{app.info.name}</p>
                </div>
            })}                    
        </div>                        
    </ModalBody>
    <ModalFooter style={props.style.footer}> 
      <AppButton
        color="primary"
        size="sm"
        onClick={props.onConfirm}
      >
       Install
      </AppButton>
    </ModalFooter>
  </Modal>
}

DependencyModal.defaultProps = defaultProps;