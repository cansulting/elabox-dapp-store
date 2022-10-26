package storehub

import (
	"encoding/json"
	"os"
	"store/client-store/backend/global"
	"store/data"
	"sync"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

const EXPIRATION_SEC = 60 * 60

var mu *sync.RWMutex
var stores map[string]*data.StoreInfo = nil
var storelist *data.StoreList = nil

var lastStoreHubUpdate int64 = 0
var storeUpdates map[string]int64 = make(map[string]int64)

func initCaches() error {
	if stores != nil {
		return nil
	}
	mu = &sync.RWMutex{}
	stores = make(map[string]*data.StoreInfo)
	storelist = &data.StoreList{}
	// load store data from cache
	if _, err := os.Stat(global.STORE_CACHE_PATH); err == nil {
		contents, err := os.ReadFile(global.STORE_CACHE_PATH)
		if err != nil {
			return err
		}
		if err := json.Unmarshal(contents, &stores); err != nil {
			return err
		}
	}
	// load store hub data from cache
	if _, err := os.Stat(global.STOREHUB_CACHE_PATH); err == nil {
		contents, err := os.ReadFile(global.STOREHUB_CACHE_PATH)
		if err != nil {
			return err
		}
		if err := json.Unmarshal(contents, storelist); err != nil {
			return err
		}
	}
	return nil
}

func IsStoreHubExpired() bool {
	return time.Now().Unix() > lastStoreHubUpdate+EXPIRATION_SEC
}

func IsStoreExpired(storeId string) bool {
	if storeUpdates[storeId] == 0 {
		return true
	}
	if time.Now().Unix() > storeUpdates[storeId]+EXPIRATION_SEC {
		return true
	}
	return false
}

func CacheStoreHub(Storelist *data.StoreList) error {
	if err := initCaches(); err != nil {
		return err
	}
	storelist = Storelist
	lastStoreHubUpdate = time.Now().Unix()
	return writeCache(storelist, global.STOREHUB_CACHE_PATH)
}

func CacheStore(store data.StoreInfo, storeHub_add string) error {
	if err := initCaches(); err != nil {
		return err
	}
	mu.Lock()
	defer mu.Unlock()
	stores[store.Id] = &store
	storeUpdates[store.Id] = time.Now().Unix()
	return writeCache(&stores, global.StoreCache)
}

func GetStoreHub() (*data.StoreList, error) {
	if err := initCaches(); err != nil {
		return nil, err
	}
	//mu.RLocker().Lock()
	//defer mu.RLocker().Unlock()
	return storelist, nil
}

func GetStore(storeId string) (*data.StoreInfo, error) {
	if err := initCaches(); err != nil {
		return nil, err
	}
	//mu.RLocker().Lock()
	//defer mu.RLocker().Unlock()
	if stores[storeId] != nil {
		res := stores[storeId]
		return res, nil
	} else {
		return nil, nil
	}
}

func writeCache(v interface{}, path string) error {
	//mu.RLocker().Lock()
	//defer mu.RLocker().Unlock()
	contents, err := json.Marshal(v)
	if err != nil {
		return err
	}
	return os.WriteFile(path, contents, perm.PUBLIC_VIEW)
}
