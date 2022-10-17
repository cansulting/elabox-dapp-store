import { useState } from "react"
import { Modal, Form, Button, InputGroup } from "react-bootstrap"
import { SideBarProps } from "../Sidebar"
import ButtonStyle from "../../assets/css/button.module.css"

function AddPackageModal(props:SideBarProps) {
    const [show, setShow] = useState(false)
    const [pkid, setPkid] = useState("")
    const [pkname, setPkname] = useState("")
    const handleAddAppClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      setShow(true)
    }
    const handleConfirmAdd = (evnt: any) => {
      props.onAddApp(pkid, pkname)
      setShow(false)
    } 
    return (
      <>
      <button className={ButtonStyle["ghost"]} onClick={handleAddAppClick}>
        Add New App
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" >
            <Form.Label>Package Id</Form.Label>
            <InputGroup>
                <InputGroup.Text>{props.storeId}.</InputGroup.Text>
                <Form.Control 
                    placeholder="sample_app"
                    onChange={(evnt) => setPkid(evnt.target.value)}/>
            </InputGroup>
            
            <Form.Text className="text-muted">Specify a unique package id. You will not be able to change it later.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Name</Form.Label>
            <Form.Control 
              placeholder="eg. My Sample App"
              onChange={(evnt) => setPkname(evnt.target.value)}
              />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleConfirmAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }

export default AddPackageModal