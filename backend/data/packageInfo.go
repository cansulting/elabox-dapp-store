package data

import (
	"store/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/app/data"
)

type PackageInfo struct {
	Id            string           `json:"id"`   // Package ID
	Name          string           `json:"name"` // Package name
	Icon          string           `json:"icon"` // Package icon
	CurrentBuild  int              `json:"currentBuild"`
	LatestBuild   int              `json:"latestBuild"`
	Status        global.AppStatus `json:"status"`
	Progress      float32          `json:"progress"`
	Notifications int              `json:"notifications"`
	Description   string           `json:"description,omitempty"`
	Updates       string           `json:"updates,omitempty"`
	Version       string           `json:"version,omitempty"`
}

type PackageDetails struct {
	Description string `json:"description"`
	Updates     string `json:"updates"`
	Version     string `json:"version"`
}

func NewPackageInfo() PackageInfo {
	return PackageInfo{}
}

// add informations
func (instance *PackageInfo) AddInfo(installed *data.PackageConfig, storeCacheItem *PackageListingCache, detailed bool) {
	if installed != nil {
		instance.CurrentBuild = int(installed.Build)
	}
	if storeCacheItem != nil {
		instance.Id = storeCacheItem.Id
		instance.Name = storeCacheItem.Name
		instance.LatestBuild = storeCacheItem.Build
		instance.Icon = storeCacheItem.Icon
		if detailed {
			// if instance.Details == nil {
			// 	instance.Details = &PackageDetails{}
			// }
			instance.Description = storeCacheItem.Description
			instance.Updates = storeCacheItem.Updates
			instance.Version = storeCacheItem.Version
			// if loaded, _ := storeCacheItem.LoadDetails(); loaded {

			// }
		}
	}

	if instance.CurrentBuild == 0 {
		instance.Status = "uninstalled"
	} else {
		instance.Status = "installed"
	}
}
