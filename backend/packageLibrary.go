package main

import (
	"errors"
	"store/backend/data"
	"store/backend/services/installer"
	"store/backend/services/store_lister"

	"github.com/cansulting/elabox-system-tools/registry/app"
)

// retrieve all apps
func RetrieveAllApps() ([]data.PackageInfo, error) {
	// step: retrieve all apps from registry
	storeItems, err := store_lister.GetItems()
	if err != nil {
		return nil, errors.New("unable to retrieve all installed packages. inner: " + err.Error())
	}
	var previews = make([]data.PackageInfo, 0, len(*storeItems))
	var tmpPreview data.PackageInfo
	// step: iterate on packages
	for _, pkg := range *storeItems {
		installed, err := app.RetrievePackage(pkg.Id)
		if err != nil {
			return nil, errors.New("unable to retrieve cache item for package: " + pkg.Id + ". inner: " + err.Error())
		}
		tmpPreview = data.PackageInfo{}
		tmpPreview.AddInfo(installed, &pkg, false)

		// check if currently in download

		previews = append(previews, tmpPreview)
	}
	return previews, nil
}

// retrieve detailed information about an app
func RetrieveApp(pkgId string) (*data.PackageInfo, error) {
	pkg, err := app.RetrievePackage(pkgId)
	if err != nil {
		return nil, err
	}
	storeCacheItem, err := store_lister.GetItem(pkgId)
	if err != nil {
		return nil, err
	}
	if storeCacheItem == nil {
		return nil, nil
	}
	var pkgInfo = data.PackageInfo{}
	pkgInfo.AddInfo(pkg, storeCacheItem, true)
	return &pkgInfo, nil
}

// use to download and install app
func DownloadInstallApp(pkgId string) error {
	link, err := store_lister.RetrieveDownloadLink(pkgId)
	if err != nil {
		return err
	}
	installer.CreateTask(pkgId, link)
	return nil
}

func UninstallApp(pkgId string) {

}

func StopApp(pkgId string) {

}