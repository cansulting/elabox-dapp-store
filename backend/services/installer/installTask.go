// this file controlls the flow of current download and install process

package installer

import (
	"store/backend/broadcast"
	"store/backend/global"
	"store/backend/services/downloader"
	"strconv"

	"github.com/cansulting/elabox-system-tools/foundation/constants"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

const RATIO_VS_DOWNLOAD = 0.25 // the progress ratio of install status vs download status

// struct the handles the lifecycle of the installation
type Task struct {
	Id              string
	Url             string
	downloadTask    *downloader.Task
	Status          global.AppStatus
	ErrorCode       int16
	installProgress int16 // the install progress. download progress is not included
	OnStateChanged  func(task *Task)
	OnErrCallback   func(code int16, reason string)
}

// function that sets the current task status
func (instance *Task) setStatus(status global.AppStatus) {
	if instance.Status == status {
		return
	}
	logger.GetInstance().Debug().Msg(instance.Id + " status changed to " + string(status))
	instance.Status = status
	instance.OnStateChanged(instance)
}

// function that sets install progress
func (instance *Task) SetInstallProgress(progress int16) {
	instance.installProgress = progress
}

// function that returns the current download + install progress
func (instance *Task) GetOverallProgress() int16 {
	if instance.downloadTask == nil {
		return 0
	}
	// compute the overall progress
	var downloadRatio float32 = 1 - RATIO_VS_DOWNLOAD
	res := float32(instance.downloadTask.GetProgress()) * downloadRatio
	res += float32(instance.installProgress) * RATIO_VS_DOWNLOAD
	return int16(res)
}

func (instance *Task) GetDownloadPath() string {
	return instance.downloadTask.GetPath()
}

// function that starts the download
func (instance *Task) download(restart bool) {
	instance.setStatus(global.Downloading)
	if instance.downloadTask == nil {
		instance.downloadTask = downloader.AddDownload(instance.Id, instance.Url)
		instance.downloadTask.OnStateChanged = instance.onDownloadStateChanged
		instance.downloadTask.OnProgressChanged = instance.onDownloadProgressChanged
	} else {
		if restart {
			instance.downloadTask.Reset()
		}
	}

	go instance.downloadTask.Start()
}

// callback when download task state changed
func (instance *Task) onDownloadStateChanged(task *downloader.Task) {
	switch task.GetStatus() {
	case downloader.Finished:
		instance.setStatus(global.Downloaded)
	case downloader.Error:
		instance.onError(task.GetError(), "download error")
	}
}

// callback when download task progress changed
func (instance *Task) onDownloadProgressChanged(task *downloader.Task) {
	if err := broadcast.PublishDownloadProgress(50, instance.Id); err != nil {
		logger.GetInstance().Error().Err(err).Caller().Msg("publish download progress failed")
	}
}

// callback when error found while installing
func (instance *Task) onError(code int16, reason string) {
	logger.GetInstance().Error().Str("code", strconv.Itoa(int(code))).Msg(reason)
	instance.OnErrCallback(code, reason)
}

// function that installs the package given the package path
// @param pkgPath the path to the package. If empty, the download path will be used
func (instance *Task) install(pkgPath string) error {
	if pkgPath == "" {
		pkgPath = instance.GetDownloadPath()
	}
	instance.setStatus(global.Installing)
	// call the package installer
	action := data.NewAction(constants.ACTION_APP_INSTALL, "", pkgPath)
	_, err := global.RPC.StartActivity(action)
	if err != nil {
		instance.onError(global.INSTALLER_PACKAGE_ERROR, err.Error())
		return err
	}
	return nil
}

func (instance *Task) Start() {
	instance.download(false)
}

// this skips the download and install the package right away given the package path
func (instance *Task) StartFromFile(pkgPath string) error {
	return instance.install(pkgPath)
}

// callback when download task was removed from manager
func (instance *Task) onDestroy() {
	logger.GetInstance().Debug().Msg(instance.Id + " was removed from installer manager")
}
