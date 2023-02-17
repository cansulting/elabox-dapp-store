import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import useStoreHubStore, { StoreHubState } from "./states/storehub"
import DashboardController from "./controllers/v2/AllViewDashboard"
import AppStyles from "./assets/css/app.module.css"
import { StoresController } from "./controllers/Stores"
import StoreDetailsController from "./controllers/StoreDetails"
import { PackageInfo } from "./data/packageInfo"
import { AppInfoCon } from "./controllers/v2/AppInfoCon"
import { Notification} from "./data/notification"

function App(): JSX.Element {
  const storeHub:StoreHubState= useStoreHubStore((state) => state)
  const [selectedApp, setSelectedApp] = useState(null as PackageInfo)
  React.useEffect(() => {
      storeHub.fetchStores()
      //eslint-disable-next-line
  },[])
  const updateStatus = (appInfo: PackageInfo, node:any) : Notification =>{
    let notification : Notification = {content: "", type: "info"}
    if (appInfo.status === 'installed' && appInfo.enabled) {
        if (appInfo.isRunning === true && node.hasOwnProperty("servicesRunning")){
            if(node.servicesRunning){
                notification={type:"info",content:"Syncing"}
            }      
            else {
                notification={type:"info",content:"Initializing"}
            }                  
        }
        else {
            if(appInfo.isRunning === true) {
                notification={type:"info",content:"Running"}
            }   
            else{
                notification={type:"error",content:"Not running"}   
            }
        } 
    }
    return notification 
  }
  const onRestart= () =>{
  }
  const onResync = () =>{
  }
  const closeRestartModal = () =>{
      //setRestartModal(false)
  }
  const closeResyncModal = () =>{
  }
  const onBack = () => {
    setSelectedApp(null)
  }
  const handleAppStateChanged = (appInfo: PackageInfo) =>{
    const notification = updateStatus(appInfo, null)      
    appInfo = {...appInfo, notificationContents: [notification]}                       
    setSelectedApp(appInfo)                                                            
  }
  return (
    <div className={AppStyles["App"]}>
      <header className={AppStyles["App-header"]}></header>
      <Router>
        <Routes>
          { !selectedApp && <Route path="/" element={<DashboardController onClick={setSelectedApp}/>} />}
          { selectedApp && 
            <Route path="/" element={<AppInfoCon 
                    onRestart={onRestart} 
                    onResync={onResync} 
                    info={selectedApp} 
                    onBack={onBack} 
                    onAppStateChanged={handleAppStateChanged}>
                        {/* {app.enabled && children(app, node)} */}
                </AppInfoCon>} />
          }
          <Route path="/stores" element={<StoresController stores={storeHub.list}/>} />
          <Route path="/store/:id" element={<StoreDetailsController/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
