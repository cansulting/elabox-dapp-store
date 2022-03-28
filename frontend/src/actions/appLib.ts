import { PackageInfo } from "../data/packageInfo";
import { 
  eventHandler, 
  PACKAGE_ID,
  AC_RETRIEVE_PKG,
  AC_RETRIEVE_PKGS,
  AC_INSTALL_PKG
 } from "./constants";

export async function retrieveAllListings() : Promise<PackageInfo[]>{
  console.log("Retrieve all listing")
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_RETRIEVE_PKGS)
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkgs = JSON.parse(res.message) 
  const apps : PackageInfo[] = []
  for (const item of pkgs) {
    apps.push(item)
  }
  console.log(pkgs)
  return apps
}

export async function retrieveListing(packageId: string) : Promise<PackageInfo> {
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_RETRIEVE_PKG, packageId)
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkg = JSON.parse(res.message) 
  return pkg
}

// use to install package
export async function installPackage(packageId: string) {
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_INSTALL_PKG, packageId)
  console.log(res)
}