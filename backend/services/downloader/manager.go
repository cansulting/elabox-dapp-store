package downloader

import (
	"os"
	"store/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
	"github.com/cansulting/elabox-system-tools/foundation/perm"
)

var downloadTasks = make(map[string]*Task)
var isInit = false

func initialize() {
	if isInit {
		return
	}
	isInit = true
	if err := os.MkdirAll(global.DownloadCache, perm.PUBLIC_WRITE); err != nil {
		logger.GetInstance().Error().Msg("unable to create cache directory " + global.DownloadCache)
	}
}

func AddDownload(id string, url string) *Task {
	initialize()
	task := NewTask(id, url, global.DownloadCache+"/"+id)
	downloadTasks[id] = task
	// task.onStateChanged = onTaskStateChanged
	// task.onError = onTaskError
	//task.Start()
	return task
}

func GetDownload(id string) *Task {
	return downloadTasks[id]
}

func RemoveDownload(id string) {
	delete(downloadTasks, id)
}

// func onTaskStateChanged(task *Task) {
// 	// do something
// }

// func onTaskError(task *Task) {
// 	// do something
// }
