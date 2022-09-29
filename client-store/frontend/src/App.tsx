import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import useStoreHubStore from "./stores/storehub"
import { StoreHubState } from "./interfaces/stores/storeHub"
import DashboardController from "./controllers/Dashboard"
import AppStyles from "./assets/css/app.module.css"
import { StoresController } from "./controllers/Stores"
import StoreDetailsController from "./controllers/StoreDetails"
function App(): JSX.Element {
  const storeHub:StoreHubState= useStoreHubStore((state) => state)
  React.useEffect(() => {
      storeHub.fetchStores()
      //eslint-disable-next-line
  },[])
  return (
    <div className={AppStyles["App"]}>
      <header className={AppStyles["App-header"]}></header>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardController stores={storeHub.list}/>} />
          <Route path="/stores" element={<StoresController stores={storeHub.list}/>} />
          <Route path="/store/:id" element={<StoreDetailsController/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
