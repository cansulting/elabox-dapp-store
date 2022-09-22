import React from "react"
import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom"
import useStoreHubStore from "./stores/storehub"
import { StoreHubState } from "./interfaces/stores/storeHub"
import DashboardController from "./controllers/Dashboard"
import Stores from "./pages/Stores"
import StoreDetails from "./pages/StoreDetails"
import AppStyles from "./assets/css/app.module.css"
import { StoresController } from "./controllers/Stores"
function App(): JSX.Element {
  const navigate = useNavigate()
  const storeHub:StoreHubState= useStoreHubStore((state) => state)
  React.useEffect(() => {
      storeHub.fetchStores()
      //eslint-disable-next-line
  },[])
  const onStoreClick= () =>{
    alert("test")
  }
  return (
    <div className={AppStyles["App"]}>
      <header className={AppStyles["App-header"]}></header>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardController stores={storeHub.list}/>} />
          <Route path="/stores" element={<StoresController stores={storeHub.list}/>} />
          <Route path="/store/" element={<StoreDetails id={"asoidjaosdij"} icon={"asdsad"} title={"asoidjasoidjasoid"} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
