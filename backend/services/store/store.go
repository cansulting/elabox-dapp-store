package store

import "store/backend/data"

var pkgsCache *[]data.PackageListingCache

// retrieve all cached apps
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

// retrieve cache item based from package id
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
func RetrieveItems() {

}
