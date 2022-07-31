import { PackageInfo } from "../data/packageInfo";
import { 
  getEventHandler, 
  PACKAGE_ID,
  AC_RETRIEVE_PKG,
  AC_RETRIEVE_PKGS,
  AC_INSTALL_PKG,
  AC_UNINSTALL_PKG,
  AC_CANCEL_PKG,
  AC_RETRIEVE_SYSTEM_VERSION,
  AC_RESYNC,
  AC_RESTART,
  AC_OFF,
  AC_ON,
  AC_CHECK_STATUS,
  AC_CHECK_IF_PACKAGE_IS_DEPENDENCY
 } from "./constants";

export async function retrieveAllListings(beta = false) : Promise<PackageInfo[]>{
  console.log("Retrieve all listing")
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_PKGS, "", {beta:beta})
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkgs = JSON.parse(res.message) 
  console.log(pkgs)
  return pkgs
}

export async function retrieveListing(packageId: string) : Promise<PackageInfo> {
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_PKG, packageId)
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkg = JSON.parse(res.message) 
  //console.log("retrieve listing", res)
  return pkg
}

// use to install package
export async function installPackage(packageId: string) {
  await getEventHandler().sendRPC(PACKAGE_ID, AC_INSTALL_PKG, packageId)
}

export async function uninstallPackage(packageId: string) {
  await getEventHandler().sendRPC(PACKAGE_ID, AC_UNINSTALL_PKG, packageId)
}
export async function cancelPackage(packageId:string) {
  await getEventHandler().sendRPC(PACKAGE_ID, AC_CANCEL_PKG, packageId)
}

export async function retrieveSystemVersion() : Promise<string> {
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_SYSTEM_VERSION,)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}

// resync specific service/node
export async function resync(packageId: string) : Promise<string> {
  console.log("resync...")
  const res = await getEventHandler().sendSystemRPC(AC_RESYNC, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}

// restart specific service/node
export async function restart(packageId: string) : Promise<string> {
  console.log("restart...")
  const res = await getEventHandler().sendSystemRPC(AC_RESTART, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}

// off specific service/node
export async function disablePackage(packageId: string) : Promise<string> {
  console.log("off...")
  const res = await getEventHandler().sendSystemRPC(AC_OFF, packageId)
  console.log(res)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}

// on specific service/node
export async function On(packageId: string) : Promise<string> {
  console.log("On...")
  const res = await getEventHandler().sendSystemRPC(AC_ON, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}
// check specific service/node status

export async function OnCheckStatus(packageId: string) : Promise<boolean> {
  console.log("Checking Status...")
  const res = await getEventHandler().sendSystemRPC(AC_CHECK_STATUS, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  let enabled = true
  if ( res.message === "false" || !res.message)
    enabled = false
  return enabled
}

export async function OnCheckIfDependent(packageId:string): Promise<boolean> {
  console.log("Checking If dependency...")
  const res = await getEventHandler().sendRPC(PACKAGE_ID,AC_CHECK_IF_PACKAGE_IS_DEPENDENCY, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  let isDependent = true
  if ( res.message === "false" || !res.message)
  isDependent = false
  return isDependent
}