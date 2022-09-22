import { useNavigate } from "react-router-dom"
import {StoresControllerProps} from "../interfaces/controllers/stores"
import StoresPage from "../pages/Stores"
export function StoresController(props:StoresControllerProps){
    const navigate = useNavigate()
    const onStoreClick= (id:string) =>{
        navigate(`/stores/${id}`)
    }
    return <StoresPage stores={props.stores} onStoreClick={onStoreClick}/>
}