import { useState } from "react"
import { PackageInfo } from "../data/packageInfo"
import { useStoreState } from "../states/store"
import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import Body from "../components/Body"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import { DashbordProps } from "../interfaces/dashboard"
import { useBuildState } from "../states/builds"

function Dashboard(props: DashbordProps): JSX.Element {
  const { 
    selectedTab, 
    selectedPkg, 
    setSelectedTab,
    setSelectedPackage,
    updatePackage,
    hiveUpdate,
  } = useStoreState()
  const {
    builds,
    uploadBuild
  } = useBuildState()
  const handleSelectTab = (index: number) => {
    setSelectedTab(index)
  }
  const onSearch = (qeury: string) => {

  }
  const onAddAppPressed = () => {

  }
  const onSelectedPkg = (pkg: PackageInfo) => {
    setSelectedPackage(pkg.id)
  }
  const onUploadBuild = (buf: Buffer) => {
    uploadBuild(selectedPkg.id, 1, buf, (progress) => {
      console.log("progress", progress)
    })
  }
  // apply changes was called after editing
  const onApplyProfileChanges = (newpkg: PackageInfo) => {
    updatePackage(newpkg)
    hiveUpdate()
  }
  const pkgs = Object.values( props.storeData.packages)
  return (
    <div className={DashboardStyle["app-dashboard"]}>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <Header
          app={selectedPkg}
          onSearch={onSearch}
          tab={{
            index: selectedTab,
            onSelectTab: handleSelectTab,
          }}
        />
      </div>
      <div className={DashboardStyle["app-dashboard-body"]}>
        <SideBar onAddApp={onAddAppPressed} stores={pkgs}/>
        <Body tabIndex={selectedTab} 
          builds={builds[selectedPkg.id]}
          app={selectedPkg} 
          onUpload={onUploadBuild}
          onApply={onApplyProfileChanges}/>
      </div>
    </div>
  )
}

export default Dashboard
