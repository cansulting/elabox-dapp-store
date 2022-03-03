package store

import (
	"encoding/json"
	"errors"
	"os"
	"store/backend/data"
	"store/backend/global"
)

// function that retreives all cached apps
func retrieveCache() (*[]data.PackageListingCache, error) {
	// is file exists
	if _, err := os.Stat(global.StoreCache); err != nil {
		return nil, errors.New("cache file not found")
	}
	contents, err := os.ReadFile(global.StoreCache)
	if err != nil {
		return nil, errors.New("unable to read cache file " + global.StoreCache)
	}

	var cache *[]data.PackageListingCache
	err = json.Unmarshal(contents, cache)
	if err != nil {
		return nil, errors.New("unable to unmarshal cache file " + global.StoreCache)
	}
	return cache, nil
}
