package listing

import (
	"encoding/json"
	"log"
	"os"
	"store/server/global"
	"time"
)

var instance map[string]*PackageInfo
var lastUpdated int64 = 0

func GetInstance() map[string]*PackageInfo {
	// step: reload file for every X seconds
	diff := time.Now().Unix() - lastUpdated
	reload := diff > int64(global.RELOAD_TIME.Seconds())
	if reload || instance == nil {
		lastUpdated = time.Now().Unix()
		loadInstance()
	}
	return instance
}

func GetPackageInfo(packageId string) *PackageInfo {
	if instance == nil {
		loadInstance()
	}
	return instance[packageId]
}

func loadInstance() {
	// step: load file
	bytes, err := os.ReadFile(global.LISTING_PATH)
	if err != nil {
		log.Println("unable to load listing. inner: " + err.Error())
		return
	}
	tmp := make(map[string]*PackageInfo)
	// step: decode the loaded file
	err = json.Unmarshal(bytes, &tmp)
	if err != nil {
		log.Println("unable to unmarshal listing. inner: " + err.Error())
		return
	}
	instance = tmp
	log.Println("loaded listing")
}
