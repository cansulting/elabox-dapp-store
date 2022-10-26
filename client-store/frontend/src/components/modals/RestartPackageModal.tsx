import {useState} from "react";

import { Button,  Modal,
    ModalBody,
    ModalFooter,
    ModalHeader} from "react-bootstrap"
import errorLogo from "../views/images/error.png";

const RestartModal = (props:any) => {
    const {isOpen,name,closeModal, } = props
    const [password , setPassword] = useState("")
    const [errorModal,setErrorModal] = useState(false)
    const hamdleChangePassword = (event:any) => {
        const { target } = event;
        const { name } = target;
        setPassword(target.value)
    } 
    const verifyPassword = (action:any) => {
        // e.preventDefault();
        closeModal(false)  
    }
    const restartNode = (pwd:string) => {
        // e.preventDefault();
        closeModal()
    };    
    const errorToggle= () =>{
    setErrorModal(false)
    }
    return  <>
            <Modal isOpen={errorModal} centered>
                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                    Invalid password, please try again
                    <br />
                    <br />
                    <img src={errorLogo} style={{ width: "50px", height: "50px" }} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={errorToggle}>
                    Close
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isOpen} centered>
            <ModalHeader> Restart {name}</ModalHeader>
            <ModalBody>
                You are about to restart the {name}
                <br />
                This process will take a few hours
                <br />
                <br />              
                <input
                    type="password"
                    id="pwd"
                    name="pwd"
                    placeholder="Enter password"
                    required
                    onChange={hamdleChangePassword}
                    />              
                <br />
                <br />        
            </ModalBody>
            <ModalFooter>
            <Button
                data-testid="restart-btn"
                color="success"
                onClick={verifyPassword}              
            >
                Restart
            </Button>
            <Button color="danger" onClick={closeModal}>
                Cancel
            </Button>
            </ModalFooter>
            </Modal>      
    </>      
}

export default RestartModal