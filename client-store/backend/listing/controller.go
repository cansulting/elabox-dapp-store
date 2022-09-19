package listing

import (
	"encoding/json"
	"log"
	"os"
	"store/client-store/backend/global"
	"time"
)
var instance *StoresInfo
var lastUpdated int64 = 0

func GetInstance() *StoresInfo {
	// step: reload file for every X seconds
	diff := time.Now().Unix() - lastUpdated
	reload := diff > int64(global.RELOAD_TIME.Seconds())
	if reload || instance == nil {
		lastUpdated = time.Now().Unix()
		loadInstance()
	}
	return instance
}
func getStoresInfo() *StoresInfo{
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
func loadInstance() {
	// step: load file
	bytes, err := os.ReadFile(global.LISTING_PATH)
	if err != nil {
		log.Println("unable to load listing. inner: " + err.Error())
		return
	}
	//create tmp variable based ons storesInfo struct
	tmp := &StoresInfo{}
	// step: decode the loaded file
	err = json.Unmarshal(bytes, &tmp)
	if err != nil {
		log.Println("unable to unmarshal listing. inner: " + err.Error())
		return
	}
	instance = tmp
	log.Println("loaded listing")
}