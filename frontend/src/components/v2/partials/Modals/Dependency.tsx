import React from 'react'
import { PackageInfo } from '../../../../data/packageInfo'
import { AppButton } from '../../AppButton'
import { Modal } from "react-bootstrap"

export interface DependencyModalProps {
    title?: string
    dependencies: Array<PackageInfo>
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
interface DependecyBody {
    dependencies: Array<PackageInfo>
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
    <Modal.Header style={props.style.header}>
        {props.title}
    </Modal.Header>
    <Modal.Body style={props.style.body}> 
        <h4>Install Dependencies?</h4>    
        <Body dependencies={props.dependencies}/>                
    </Modal.Body>
    <Modal.Footer style={props.style.footer}> 
      <AppButton
        color="primary"
        size="sm"
        onClick={props.onConfirm}
      >
       Confirm
      </AppButton>
    </Modal.Footer>
  </Modal>
}
const Body = (props:DependecyBody): JSX.Element => {
    return <>
        <div className='d-flex justify-content-center' style={{ gap:10,marginTop:"5vh" }}>
            {props.dependencies.map(info => {
                return <div>
                        <img
                            src={info.icon}
                            alt={info.name}
                            style={{
                                width: '130px',
                                height: '130px',
                                borderRadius: 10,
                            }}
                        />    
                        <p>{info.name}</p>
                </div>
            })}                    
        </div>            
    </>
}

DependencyModal.defaultProps = defaultProps;