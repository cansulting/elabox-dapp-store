package listing

import (
	"encoding/json"
	"log"
	"os"
	"store/data"
	"store/storehub/config"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var instance *data.StoresInfo
var lastUpdated int64 = 0

func GetInstance() *data.StoresInfo {
	// step: reload file for every X seconds
	diff := time.Now().Unix() - lastUpdated
	reload := diff > int64(config.RELOAD_TIME.Seconds())
	if reload || instance == nil {
		lastUpdated = time.Now().Unix()
		res, err := loadInstance()
		if err != nil {
			log.Println("found issue listing", err)
			return nil
		}
		instance = res
		log.Println("loaded listing")
	}
	return instance
}

func getStoresInfo() *data.StoresInfo {
	return instance
}
func getStoreInfo(storeId string) *data.StoreInfo {
	// search array
	for _, store := range instance.Stores {
		if store.Id == storeId {
			return &store
		}
	}
	return nil
}
func loadInstance() (*data.StoresInfo, error) {
	// step: load file
	bytes, err := os.ReadFile(config.LISTING_PATH)
	if err != nil {
		return nil, err
	}
	//create tmp variable based ons storesInfo struct
	tmp := &data.StoresInfo{}
	// step: decode the loaded file
	err = json.Unmarshal(bytes, &tmp)
	return tmp, err
}

func saveInstance(storeList *data.StoresInfo) error {
	content, err := json.Marshal(storeList)
	if err != nil {
		return err
	}
	if err := os.WriteFile(config.LISTING_PATH, content, perm.PUBLIC_VIEW); err != nil {
		return err
	}
	instance = storeList
	return nil
}

func UpdateStoreInfo(info data.StoreInfo) {
	stores := GetInstance()
	index := stores.FindIndexById(info.Id)
	if index < 0 {
		stores.Stores = append(stores.Stores, info)
	} else {
		oldInfo := stores.Stores[index]
		data.ReplaceStoreInfo(&oldInfo, info)
		stores.Stores[index] = oldInfo
	}
	saveInstance(stores)
}
