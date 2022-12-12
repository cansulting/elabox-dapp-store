package broadcast

import (
	"log"
	"store/client-store/backend/data"
	"store/client-store/backend/global"
	"strconv"

	sdata "github.com/cansulting/elabox-system-tools/foundation/event/data"
)

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
	_, err := global.RPC.CallBroadcast(sdata.NewAction(global.UPDATE_AVAILABLE, global.PackageId, jsonStr))
	return err
}

func PublishError(pkid string, code int, msg string) error {
	val := `{"code":` + strconv.Itoa(code) + `,"error":"` + msg + `", "packageId":"` + pkid + `"}`
	_, err := global.RPC.CallBroadcast(sdata.NewAction(global.BROADCAST_ERROR, global.PackageId, val))
	return err
}