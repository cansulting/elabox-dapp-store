package main

import (
	"errors"
	"sort"
	"store/backend/data"
	"store/backend/services/installer"
	"store/backend/services/store_lister"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/registry/app"
)

// retrieve all apps
// @beta is true if include all apps for testing and demo apps
func RetrieveAllApps(beta bool) ([]data.PackageInfo, error) {
	// step: retrieve all apps from registry
	storeItems, err := store_lister.GetItems()
	if err != nil {
		return nil, errors.New("unable to retrieve all installed packages. inner: " + err.Error())
	}
	var previews = make([]data.PackageInfo, 0, len(storeItems))
	var tmpPreview data.PackageInfo
	// step: iterate on packages
	for _, pkg := range storeItems {
		// skip if ignore beta app
		if !beta && pkg.Beta {
			continue
		}
		installedInfo, err := app.RetrievePackage(pkg.Id)
		if err != nil {
			logger.GetInstance().Debug().Msg("unable to retrieve cache item for package: " + pkg.Id + ". inner: " + err.Error())
		}
		tmpPreview = data.PackageInfo{}
		tmpPreview.AddInfo(installedInfo, pkg, false)
		if task := installer.GetTask(tmpPreview.Id); task != nil {
			tmpPreview.Status = task.Status
		}

		// check if currently in download
		previews = append(previews, tmpPreview)
	}
	// sort preview by name
	sort.Slice(previews, func(i, j int) bool {
		return previews[i].Name < previews[j].Name
	})

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
	if task := installer.GetTask(pkgInfo.Id); task != nil {
		pkgInfo.Status = task.Status
	}

	return &pkgInfo, nil
}

// use to download and install app
func DownloadInstallApp(pkgId string) error {
	link, err := store_lister.RetrieveDownloadLink(pkgId)
	if err != nil {
		return err
	}
	task, err := installer.CreateInstallTask(pkgId, link)
	if err != nil {
		return err
	}
	task.Start()
	return nil
}

func UninstallApp(pkgId string) error {
	task := installer.CreateUninstallTask(pkgId)
	return task.Uninstall()
}

func StopApp(pkgId string) {

}
