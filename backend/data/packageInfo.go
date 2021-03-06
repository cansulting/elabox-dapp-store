package data

import (
	"store/backend/global"
	"strconv"

	"github.com/cansulting/elabox-system-tools/foundation/app/data"
)

type PackageInfo struct {
	Id               string           `json:"id"`   // Package ID
	Name             string           `json:"name"` // Package name
	Icon             string           `json:"icon"` // Package icon
	CurrentBuild     int              `json:"currentBuild"`
	LatestBuild      int              `json:"latestBuild"`
	Status           global.AppStatus `json:"status"`
	Progress         float32          `json:"progress"`
	Notifications    int              `json:"notifications"`
	Description      string           `json:"description,omitempty"`
	Updates          string           `json:"updates,omitempty"`
	Version          string           `json:"version,omitempty"`
	LaunchUrl        string           `json:"launchUrl,omitempty"`
	Category         string           `json:"category,omitempty"`
	IsService        bool             `json:"isService"`
	LatestMinRuntime string           `json:"latestMinRuntime,omitempty"` // the minimum runtime required to install this package
}

func NewPackageInfo() PackageInfo {
	return PackageInfo{}
}

// add informations
func (instance *PackageInfo) AddInfo(installed *data.PackageConfig, storeCacheItem *PackageListingCache, detailed bool) {
	if installed != nil {
		instance.CurrentBuild = int(installed.Build)
		instance.IsService = installed.ExportServices
		// resolve launch url
		if detailed {
			if !installed.ExportServices ||
				installed.ActivityGroup.CustomLink != "" ||
				installed.ActivityGroup.CustomPort != 0 {
				instance.LaunchUrl = "/" + installed.PackageId
				if installed.ActivityGroup.CustomLink != "" {
					instance.LaunchUrl = installed.ActivityGroup.CustomLink
				} else {
					if installed.ActivityGroup.CustomPort != 0 {
						instance.LaunchUrl = ":" + strconv.Itoa(installed.ActivityGroup.CustomPort)
					}
				}
			}
		}
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
			instance.LatestMinRuntime = storeCacheItem.MinRuntime
			instance.Category = storeCacheItem.Category
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
