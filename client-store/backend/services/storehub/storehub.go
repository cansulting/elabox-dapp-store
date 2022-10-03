package storehub

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"store/client-store/backend/global"
	"store/client-store/backend/services/ipfs"
	"store/data"
)

// retrieve store info from list
func RetrieveStoreList(storehub_add string) (*data.StoreList, error) {
	res, err := http.Get(global.STOREHUB_SERVER + "/api/v1/items")
	if err != nil {
		return nil, err
	}
	body, _ := ioutil.ReadAll(res.Body)
	var stores data.StoreList
	if err := json.Unmarshal(body, &stores); err != nil {
		return nil, err
	}
	return &stores, nil
}

func RetrieveStore(storeId string) (*data.StoreInfo, error) {
	stores, err := RetrieveStoreList("")
	if err != nil {
		return nil, err
	}
	for _, store := range stores.Stores {
		if store.Id == storeId {
			var storeinfo data.StoreInfo
			if err := ipfs.DownloadJson(store.StoreCID, &storeinfo); err != nil {
				return nil, err
			}
			return &storeinfo, nil
		}
	}
	return nil, nil
}

func RetrieveAllApps(storehub string) ([]data.PackagePreview, error) {
	stores, err := RetrieveStoreList(storehub)
	if err != nil {
		return nil, err
	}
	var res []data.PackagePreview
	var storeinfo data.StoreInfo
	for _, store := range stores.Stores {
		if err := ipfs.DownloadJson(store.StoreCID, &storeinfo); err != nil {
			println("Error ondownloading store info", err)
			continue
		}
		for _, v := range storeinfo.Packages {
			res = append(res, v)
		}
	}
	return res, nil
}

func RetrieveApp(packageId string, storehub string) (*data.PackagePreview, error) {
	pkgs, err := RetrieveAllApps(storehub)
	if err != nil {
		return nil, errors.New("failed retrieve app, " + err.Error())
	}
	for _, pkg := range pkgs {
		if pkg.Id == packageId {
			return &pkg, nil
		}
	}
	return nil, nil
}
