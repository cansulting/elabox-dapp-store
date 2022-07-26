package store_lister

import (
	"encoding/json"
	"errors"
	"os"
	"store/backend/data"
	"store/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

// function that retreives all cached apps from store server
func retrieveCache() ([]*data.PackageListingCache, error) {
	// is file exists
	if _, err := os.Stat(global.StoreCache); err != nil {
		return nil, errors.New("cache file not found")
	}
	contents, err := os.ReadFile(global.StoreCache)
	if err != nil {
		return nil, errors.New("unable to read cache file " + global.StoreCache)
	}

	var cache []*data.PackageListingCache
	err = json.Unmarshal(contents, &cache)
	if err != nil {
		return nil, errors.New("unable to unmarshal cache file " + global.StoreCache)
	}
	return cache, nil
}

// function that saves cache to file
func saveCache(data interface{}, path string) error {
	if err := os.MkdirAll(global.CacheDir, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create cache directory " + global.CacheDir)
	}
	// marshal data to json
	contents, err := json.Marshal(data)
	if err != nil {
		return errors.New("unable to marshal cache file")
	}
	// save to file
	if err := os.WriteFile(path, contents, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to save cache file. inner: " + err.Error())
	}
	return nil
}
