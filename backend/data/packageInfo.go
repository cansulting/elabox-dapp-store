package data

import (
	"github.com/cansulting/elabox-system-tools/foundation/app/data"
)

type PackageInfo struct {
	Id           string         `json:"id"`   // Package ID
	Name         string         `json:"name"` // Package name
	Icon         string         `json:"icon"` // Package icon
	CurrentBuild int            `json:"currentBuild"`
	LatestBuild  int            `json:"latestBuild"`
	Status       string         `json:"status"`
	Progress     float32        `json:"progress"`
	Alerts       int            `json:"alerts"`
	Details      PackageDetails `json:"details"` // extra details
}

type PackageDetails struct {
	Description string `json:"description"`
	Updates     string `json:"updates"`
}

func NewPackageInfo() PackageInfo {
	return PackageInfo{Details: PackageDetails{}}
}

// add informations
func (instance PackageInfo) AddInfo(installed data.PackageConfig, storeCacheItem *PackageListingCache, detailed bool) {
	instance.Id = installed.PackageId
	instance.Name = installed.Name
	instance.CurrentBuild = int(installed.Build)
	if detailed {
		instance.Details.Description = installed.Description
	}
	if storeCacheItem != nil {
		instance.LatestBuild = storeCacheItem.Build
		instance.Icon = storeCacheItem.Icon
		if detailed {
			if loaded, _ := storeCacheItem.LoadDetails(); loaded {
				instance.Details.Description = storeCacheItem.Description
				instance.Details.Updates = storeCacheItem.Updates
			}
		}
	}
}
