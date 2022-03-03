package main

import (
	"errors"
	"store/backend/data"
	"store/backend/services/store"

	"github.com/cansulting/elabox-system-tools/registry/app"
)

// retrieve all apps
func RetrieveAllApps() ([]data.PackageInfo, error) {
	// step: retrieve all apps from registry
	storeItems, err := store.GetItems()
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
	var pkgInfo = data.PackageInfo{}

	storeCacheItem, err := store.GetItem(pkgId)
	if err != nil {
		return nil, err
	}
	pkgInfo.AddInfo(pkg, storeCacheItem, true)
	return &pkgInfo, nil
}

func InstallApp(pkgId string) {

}
