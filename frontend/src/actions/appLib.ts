import { AppIconProps } from "../components/AppIcon";
import { 
  eventHandler, 
  PACKAGE_ID,
  AC_RETRIEVE_PKG,
  AC_RETRIEVE_PKGS,
  AC_INSTALL_PKG
 } from "./constants";

export async function retrieveAllListings() : Promise<AppIconProps[]>{
  console.log("Retrieve all listing")
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_RETRIEVE_PKGS)
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkgs = JSON.parse(res.message) 
  const apps : AppIconProps[] = []
  for (const item of pkgs) {
    apps.push({
      id: item.id,
      label: item.name,
      iconImg: item.icon,
      status: item.status,
      percent: item.progress
    })
  }
  console.log(pkgs)
  return apps
}

export async function retrieveListing(packageId: string) {
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_RETRIEVE_PKG, {packageId: packageId})
  if (res.code !== 200 )
    throw new Error(res.message)
  const pkgs = JSON.parse(res.message) 
  console.log(pkgs)
}

// use to install package
export async function installPackage(packageId: string) {
  const res = await eventHandler.sendRPC(PACKAGE_ID, AC_INSTALL_PKG, {packageId: packageId})
  console.log(res)
}