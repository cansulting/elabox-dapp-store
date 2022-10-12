import { PackageInfo } from "../data/packageInfo"
import { useStoreState } from "../states/store"
import DashboardStyle from "../assets/css/pages/dashboard.module.css"
import Body from "../components/Body"
import Header from "../components/Header"
import SideBar from "../components/Sidebar"
import { useBuildState } from "../states/builds"
import { StoreInfo } from "../data/storeInfo"
import { ReleaseInfo } from "../data/releaseInfo"

export interface DashbordProps {
  storeData: StoreInfo
}

function Dashboard(props: DashbordProps): JSX.Element {
  const { 
    selectedTab, 
    selectedPkg, 
    setSelectedTab,
    setSelectedPackage,
    updatePackage,
    updatePackageRelease,
    deletePackage,
    hiveUpdate,
  } = useStoreState()
  const {
    builds,
    uploadBuild,
    deleteBuilds,
  } = useBuildState()
  const handleSelectTab = (index: number) => {
    setSelectedTab(index)
  }
  const onSearch = (qeury: string) => {

  }
  const onAddAppPressed = (pkid:string, pkname:string) => {

  }
  const onSelectedPkg = (pkg: PackageInfo) => {
    setSelectedPackage(pkg.id)
  }
  const onUploadBuild = (buf: Buffer, packageInfo:any) => {
    uploadBuild(selectedPkg.id, packageInfo.build, buf, (progress) => {
      console.log("progress", progress)
    })
  }
  // apply changes was called after editing
  const onApplyProfileChanges = (newpkg: PackageInfo) => {
    updatePackage(newpkg)
    hiveUpdate()
  }
  // release for production
  const onReleaseProd = (release: ReleaseInfo) => {
    console.log(release)
    updatePackageRelease(selectedPkg.id, "prod", release.prod)
    hiveUpdate()
  }
  // called when package confirmed to be deleted
  const onPackageDelete = (pkg: PackageInfo) => {
    deleteBuilds(pkg.id)
    deletePackage(pkg.id)
    setSelectedPackage("")
    hiveUpdate()
  }
  const retrieveBuilds = async () => {
    return builds[selectedPkg.id]
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
          retrieveBuilds={retrieveBuilds}
          app={selectedPkg} 
          onUpload={onUploadBuild}
          onUpdateProfile={onApplyProfileChanges}
          onReleaseProd={onReleaseProd}
          onDeletePackage={onPackageDelete}
        />
      </div>
    </div>
  )
}

export default Dashboard
