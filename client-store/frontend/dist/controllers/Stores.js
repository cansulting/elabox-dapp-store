import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import StoresPage from "./pages/Stores";
export function StoresController(props) {
    var navigate = useNavigate();
    var onStoreClick = function (id) {
        navigate("/stores/".concat(id));
    };
    return _jsx(StoresPage, { stores: props.stores, onStoreClick: onStoreClick });
}
