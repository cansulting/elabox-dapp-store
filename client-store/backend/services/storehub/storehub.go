package storehub

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"store/client-store/backend/global"
	"store/client-store/backend/services/ipfs"
	"store/data"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// retrieve store info from list
func RetrieveStoreList(storehub_address string) (*data.StoreList, error) {
	// do we need to refetch store list from store hub?
	if !IsStoreHubExpired() {
		return GetStoreHub()
	}
	// hence retrieve
	res, err := http.Get(global.STOREHUB_SERVER + "/api/v1/items")
	if err != nil {
		logger.GetInstance().Warn().Err(err).Msg("Failed to connect to store hub")
		return GetStoreHub()
	}
	body, _ := ioutil.ReadAll(res.Body)
	var stores data.StoreList
	if err := json.Unmarshal(body, &stores); err != nil {
		return nil, err
	}
	err = CacheStoreHub(&stores)
	return &stores, err
}

func RetrieveStore(storeId string, storehub_add string) (*data.StoreInfo, error) {
	// do we need to refetch store information?
	if !IsStoreExpired(storeId) {
		return GetStore(storeId)
	}

	stores, err := RetrieveStoreList(storehub_add)
	if err != nil {
		return nil, err
	}
	for _, store := range stores.Stores {
		if store.Id == storeId {
			var storeinfo data.StoreInfo
			if err := ipfs.DownloadJson(store.StoreCID, &storeinfo); err != nil {
				logger.GetInstance().Warn().Err(err).Msg("failed to retrieve store definition, " + storeId)
				return GetStore(storeId)
			}
			err = CacheStore(storeinfo, storehub_add)
			return &storeinfo, err
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
	var storeinfo *data.StoreInfo
	for _, store := range stores.Stores {
		storeinfo, err = RetrieveStore(store.Id, storehub)
		if err == nil && storeinfo != nil {
			for _, v := range storeinfo.Packages {
				res = append(res, v)
			}
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
