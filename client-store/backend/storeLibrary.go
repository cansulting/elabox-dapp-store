package main

import (
	"errors"
	"sort"
	"store/client-store/backend/data"
	"store/client-store/backend/services/store_lister"
	"store/client-store/backend/services/storehub"
	data2 "store/data"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/system"
	"github.com/cansulting/elabox-system-tools/registry/app"
)

var deviceSerial = ""

// retrieve all stores
// @storeHubId: if nothing was provided thrn use the default
func RetrieveAllStores(storeHubId string) (*data2.StoreList, error) {
	return storehub.RetrieveStoreList(storeHubId)
}

func RetrieveStore(storeId string) (*data2.StoreInfo, error) {
	return storehub.RetrieveStore(storeId, "")
}

// retrieve all apps
// @beta is true if include all apps for testing and demo apps
func RetrieveAllApps(beta bool) ([]data.PackageInfo, error) {
	// step: retrieve all apps from registry
	storeItems, err := storehub.RetrieveAllApps("")
	if err != nil {
		return nil, errors.New("unable to retrieve all installed packages. inner: " + err.Error())
	}
	var previews = make([]data.PackageInfo, 0, len(storeItems))
	var tmpPreview data.PackageInfo
	// step: iterate on packages
	for _, pkg := range storeItems {
		installedInfo, err := app.RetrievePackage(pkg.Id)
		if err != nil {
			logger.GetInstance().Debug().Msg("unable to retrieve cache item for package: " + pkg.Id + ". inner: " + err.Error())
		}
		// if false && beta && pkg.Release.ReleaseType == data2.Beta && len(pkg.Tester.Users) > 0 {
		// 	tester, err := isTester(pkg.Tester.Users)
		// 	if err != nil {
		// 		logger.GetInstance().Debug().Msg("unable to validate user: " + err.Error())
		// 		continue
		// 	}
		// 	// not tester and not installed, skip the package
		// 	if !tester && installedInfo == nil {
		// 		continue
		// 	}
		// }
		tmpPreview = data.PackageInfo{}
		tmpPreview.AddInfo(installedInfo, &pkg, false)

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
func RetrieveApp(pkgId string, storehubId string) (*data.PackageInfo, error) {
	pkg, err := app.RetrievePackage(pkgId)
	if err != nil {
		return nil, err
	}
	storehubPkg, err := storehub.RetrieveApp(pkgId, storehubId)
	if err != nil {
		return nil, err
	}
	if pkg == nil {
		return nil, nil
	}
	var pkgInfo = data.PackageInfo{}
	pkgInfo.AddInfo(pkg, storehubPkg, true)
	enabled, err := app.GetServiceStatus(pkgId)
	if err != nil {
		return nil, errors.New("failed to check if package is enable " + pkgId)
	}
	pkgInfo.Enabled = enabled
	return &pkgInfo, nil
}

// is current user a tester?
func isTester(users []string) (bool, error) {
	isValid := false
	if deviceSerial == "" {
		deviceSerial = system.GetDeviceInfo().Serial
	}
	for _, user := range users {
		if user == deviceSerial {
			isValid = true
			break
		}
	}
	return isValid, nil
}

func retrieveAllDependencies() ([]string, error) {
	var dependenciesSet = make(map[string]bool)
	var dependencies []string
	storeItems, err := store_lister.GetItems()
	if err != nil {
		return nil, errors.New("unable to retrieve all installed packages. inner: " + err.Error())
	}
	for _, pkg := range storeItems {
		for _, dependency := range pkg.Dependencies {
			if !dependenciesSet[dependency] {
				dependenciesSet[dependency] = true
				dependencies = append(dependencies, dependency)
			}

		}
	}
	return dependencies, nil
}

// use to check if package is dependent to any package
func HasDependencies(pkgId string) (bool, error) {
	isDependent := false
	dependencies, err := retrieveAllDependencies()
	if err != nil {
		return isDependent, err
	}
	for _, dependency := range dependencies {
		if dependency == pkgId {
			isDependent = true
			break
		}
	}
	return isDependent, nil
}
