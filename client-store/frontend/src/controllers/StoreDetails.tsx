import { useParams } from "react-router-dom";
import {StoreDetailsParams} from "../interfaces/controllers/store"
import StoreDetailsPage from "./pages/StoreDetails";
import useStoreHubStore, { StoreHubState } from "../states/storehub";

export default function StoreDetailsController(){
    const storeHub:StoreHubState= useStoreHubStore((state) => state)
    const {id:storeId}= useParams() as StoreDetailsParams
    const store = storeHub.list.find((store)=>store.id===storeId) || {id:"",title:"",icon:"",description:""}
    const onClick= () =>{
    }
    return <StoreDetailsPage id={store.id} title={store.title} icon={store.icon} description={store.description} onClick={onClick}/>
}