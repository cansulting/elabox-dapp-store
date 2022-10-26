package store_lister

import (
	"errors"
	"os"
	"store/client-store/backend/data"
	"store/client-store/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var pkgsCache []*data.PackageListingCache = nil

const PARENT_DIR = "ela.companion"

// initialize this service
func Init() error {
	if err := os.MkdirAll(global.CacheDir, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create cache directory " + global.CacheDir)
	}

	return nil
}

// retrieve all items from cache
func GetItems() ([]*data.PackageListingCache, error) {
	if pkgsCache == nil {
		tmp, err := retrieveCache()
		if err != nil {
			return nil, err
		}
		pkgsCache = tmp
	}

	return pkgsCache, nil
}

// retrieve from cache item based from package id
func GetItem(pkid string) (*data.PackageListingCache, error) {
	items, err := GetItems()
	if err != nil {
		return nil, err
	}
	for _, v := range items {
		if v.Id == pkid {
			return v, nil
		}
	}
	return nil, nil
}