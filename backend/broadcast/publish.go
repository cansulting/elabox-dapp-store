package broadcast

import (
	"log"
	"store/backend/data"
	"store/backend/global"
	"strconv"

	sdata "github.com/cansulting/elabox-system-tools/foundation/event/data"
)

func PublishDownloadProgress(progress uint, itemId string) error {
	val := `{"progress":` + strconv.Itoa(int(progress)) + `,"packageId":"` + itemId + `"}`
	_, err := global.AppController.RPC.CallBroadcast(sdata.NewAction(global.DOWNLOAD_PROGRESS, global.PackageId, val))
	return err
}

func PublishNewUpdateAvailable(updates []*data.PackageListingCache) error {
	log.Println("updates found: " + strconv.Itoa((len(updates))))
	// create json from updates
	var jsonStr string = "["
	for _, v := range updates {
		if len(jsonStr) > 1 {
			jsonStr += ","
		}
		jsonStr += `{"id":"` + v.Id + `","name":"` + v.Name + `","build":` + strconv.Itoa(v.Build) + `"}`
	}
	jsonStr += "]"
	_, err := global.AppController.RPC.CallBroadcast(sdata.NewAction(global.UPDATE_AVAILABLE, global.PackageId, jsonStr))
	return err
}
