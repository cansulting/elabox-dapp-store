import { Toast, ToastContainer } from "react-bootstrap"
import { ToastMsg, useUtilState } from "../states/utils"

interface ToastProps {
    toasts: ToastMsg[]
}

function ToastCon(props:ToastProps) {
    const { removeToast } = useUtilState()
    return (
        <ToastContainer position="top-end">
            {props.toasts && props.toasts.map( item => (
                <Toast bg={item.type} autohide onClose={ e=> removeToast(item.msg)}>
                    {item.title && <Toast.Header>
                        <strong className="me-auto">{item.title}</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>}
                    <Toast.Body>{item.msg}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    )
}

export default ToastCon