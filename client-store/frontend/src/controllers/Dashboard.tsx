import { useNavigate } from "react-router-dom";
import { DashboardControllerProps } from "../interfaces/controllers/dashboard";
import DashboardPage from "../pages/Dashboard";

export default function DasbhoardController(props:DashboardControllerProps){
    const navigate = useNavigate()
    const onExploreClick= () =>{
        navigate("/stores")
    }
    const onStoreClick= () =>{

    }
    return <DashboardPage stores={props.stores} onExploreClick={onExploreClick} onStoreClick={onStoreClick}/>
}