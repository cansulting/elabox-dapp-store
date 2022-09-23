package listing

import (
	"encoding/json"
	"log"
	"os"
	"store/storehub/config"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var instance *StoresInfo
var lastUpdated int64 = 0

func GetInstance() *StoresInfo {
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

func getStoresInfo() *StoresInfo {
	return instance
}
func getStoreInfo(storeId string) *StoreInfo {
	// search array
	for _, store := range instance.Stores {
		if store.Id == storeId {
			return &store
		}
	}
	return nil
}
func loadInstance() (*StoresInfo, error) {
	// step: load file
	bytes, err := os.ReadFile(config.LISTING_PATH)
	if err != nil {
		return nil, err
	}
	//create tmp variable based ons storesInfo struct
	tmp := &StoresInfo{}
	// step: decode the loaded file
	err = json.Unmarshal(bytes, &tmp)
	return tmp, err
}

func saveInstance(storeList *StoresInfo) error {
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
