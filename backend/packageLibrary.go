package main

import (
	"encoding/json"
	"errors"
	"sort"
	"store/backend/data"
	"store/backend/global"
	"store/backend/services/installer"
	"store/backend/services/store_lister"

	sdata "github.com/cansulting/elabox-system-tools/foundation/event/data"
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
		if beta && pkg.Beta {
			if pkg.Id == "filebrowser" {
				isValid, err := isValidUser(pkg.BetaUsers)
				if err != nil {
					logger.GetInstance().Debug().Msg("unable to validate user: " + err.Error())
					continue
				}
				if !isValid {
					continue
				}
			}
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
func CancelInstall(pkgId string) {
	installer.Cancel(pkgId)
}

func StopApp(pkgId string) {

}
func isValidUser(users []string) (bool, error) {
	isValid := false
	action := sdata.NewAction(global.AC_DEVICE_SERIAL, "", nil)
	response, err := global.RPC.CallRPC(global.ACCOUNT_PACKAGE_ID, action)
	if err != nil {
		return isValid, err
	}
	resp, err := response.ToSimpleResponse()
	if err != nil {
		return isValid, err
	}
	var data map[string]interface{}
	if err := json.Unmarshal([]byte(resp.Message), &data); err != nil {
		return isValid, err
	}
	for _, user := range users {
		if user == data["Serial"] {
			isValid = true
			break
		}
	}
	return isValid, nil
}
