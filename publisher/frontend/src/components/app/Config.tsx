import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { PackageInfo } from "../../data/packageInfo"

export interface ConfigProps {
    pkg: PackageInfo
    onDeletePackage: (pkg: PackageInfo) => void
}

// component thats display ux for package deletion
function DeletePackage(props:ConfigProps) {
    const [show, setShow] = useState(false)
    const onDeletePackage = (evnt:any) => {
        setShow(true)
    }
    const onConfirmDelete = (evnt:any) => {
        props.onDeletePackage(props.pkg)
        setShow(false)
    }
    return (
        <>
            <p>
                <b>Delete Package</b>
                <Button 
                    size="sm" 
                    variant="danger" 
                    onClick={onDeletePackage}>Delete</Button>
            </p>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <b>{props.pkg.name}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onConfirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeletePackage