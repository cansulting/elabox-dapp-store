import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import StoreDetailsPage from "./pages/StoreDetails";
import useStoreHubStore from "../states/storehub";
export default function StoreDetailsController() {
    var storeHub = useStoreHubStore(function (state) { return state; });
    var storeId = useParams().id;
    var store = storeHub.list.find(function (store) { return store.id === storeId; }) || { id: "", title: "", icon: "", description: "" };
    var onClick = function () {
    };
    return _jsx(StoreDetailsPage, { id: store.id, title: store.title, icon: store.icon, description: store.description, onClick: onClick });
}
