package store

import (
	"errors"
	"os"
	"store/backend/data"
	"store/backend/global"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var pkgsCache *[]data.PackageListingCache

// initialize this service
func Init() error {
	if err := os.MkdirAll(global.CacheDir, perm.PUBLIC_WRITE); err != nil {
		return errors.New("unable to create cache directory " + global.CacheDir)
	}
	// will be called every hour
	go func() {
		for {
			RetrieveItems()
			// sleep for a while
			time.Sleep(time.Second * 60)
		}
	}()
	return nil
}

// retrieve all items from cache
func GetItems() (*[]data.PackageListingCache, error) {
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
	for _, v := range *items {
		if v.Id == pkid {
			return &v, nil
		}
	}
	return nil, nil
}

// request via http to retrieve apps
func RetrieveItems() error {
	println("retrieve store listing")
	testRetrievedData := []data.PackageListingCache{
		{
			Id:   "ela.mainchain",
			Name: "test 1",
			Icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
		},
		{
			Id:   "ela.eid",
			Name: "test 2",
			Icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
		},
	}
	// tmp: save the data retrieved data to cache file
	return saveCache(testRetrievedData, global.StoreCache)
}
