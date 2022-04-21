import { PackageInfo } from "../data/packageInfo";
import { 
  getEventHandler, 
  PACKAGE_ID,
  AC_RETRIEVE_PKG,
  AC_RETRIEVE_PKGS,
  AC_INSTALL_PKG,
  AC_UNINSTALL_PKG,
  AC_RETRIEVE_SYSTEM_VERSION
 } from "./constants";

export async function retrieveAllListings() : Promise<PackageInfo[]>{
  console.log("Retrieve all listing")
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_PKGS)
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
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_INSTALL_PKG, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  console.log(res)
}

export async function uninstallPackage(packageId: string) {
  console.log("uninstalling")
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_UNINSTALL_PKG, packageId)
  if (res.code !== 200)
    throw new Error(res.message)
  console.log(res)
}

export async function retrieveSystemVersion() : Promise<string> {
  const res = await getEventHandler().sendRPC(PACKAGE_ID, AC_RETRIEVE_SYSTEM_VERSION,)
  if (res.code !== 200)
    throw new Error(res.message)
  return res.message
}
