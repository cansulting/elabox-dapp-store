import SideBarStyle from "../assets/css/components/sidebar.module.css"
import ButtonStyle from "../assets/css/button.module.css"
import PackageListItem from "./PackageListItem"
import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { PackageInfo } from "../data/packageInfo"

export interface SideBarProps {
  packages?: PackageInfo[]
  onAddApp: (pkid: string, pkname: string) => void
  onAppSelected: (pkg: PackageInfo) => void
}

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
          <Form.Control 
            placeholder="eg. mycompany.sampleapp"
            onChange={(evnt) => setPkid(evnt.target.value)}
            />
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


function SideBar(props: SideBarProps): JSX.Element {
  return (
    <div className={SideBarStyle["app-sidebar"]}>
      <div>
        {props.packages.map((pkg) => {
          return <PackageListItem info={pkg} onClick={props.onAppSelected}/>
        })}
      </div>
      <AddPackageModal {...props}/>
    </div>
  )
}

export default SideBar
