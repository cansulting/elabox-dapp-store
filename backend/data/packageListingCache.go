package data

import (
	"encoding/json"
	"errors"
	"os"
	"store/backend/global"
)

type PackageListingCache struct {
	Id    string `json:"id"`   // Package ID
	Name  string `json:"name"` // Package name
	Icon  string `json:"icon"` // Package icon
	Build int    `json:"build"`
	// extra details
	Description    string `json:"description"`
	Updates        string `json:"updates"`
	ProjectRepo    string `json:"projectRepo"`
	ProjectWebsite string `json:"projectWebsite"`
}

// load details from cache file
func (instance PackageListingCache) LoadDetails() (bool, error) {
	pkgCache := global.CacheDir + "/" + instance.Id
	if _, err := os.Stat(pkgCache); err != nil {
		return false, nil
	}
	contents, err := os.ReadFile(pkgCache)
	if err != nil {
		return false, errors.New("unable to read cache file " + pkgCache)
	}
	err = json.Unmarshal(contents, &instance)
	if err != nil {
		return false, errors.New("unable to unmarshal cache file " + pkgCache)
	}
	return true, nil
}
