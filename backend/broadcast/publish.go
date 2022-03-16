package broadcast

import (
	"store/backend/global"
	"strconv"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
)

func PublishDownloadProgress(progress uint, itemId string) error {
	val := `{"progress":` + strconv.Itoa(int(progress)) + `,"packageId":"` + itemId + `"}`
	_, err := global.AppController.RPC.CallBroadcast(data.NewAction(global.DOWNLOAD_PROGRESS, global.PackageId, val))
	return err
}
