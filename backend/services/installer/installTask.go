package installer

import "store/backend/services/downloader"

const IDLE_STATE = 0
const DOWNLOAD_STATE = 1
const INSTALL_STATE = 2
const FINISH_STATE = 3
const ERROR_STATE = 4

// struct the handles the lifecycle of the installation
type Task struct {
	Id             string
	Url            string
	downloadTask   *downloader.Task
	Status         int16
	ErrorCode      int16
	OnStateChanged func(task *Task)
}

// function that starts the download
func (instance *Task) download(restart bool) {
	instance.Status = DOWNLOAD_STATE
	if instance.downloadTask == nil {
		instance.downloadTask = downloader.AddDownload(instance.Id, instance.Url)
		instance.downloadTask.OnStateChanged = instance.onDownloadStateChanged
	}
	if restart {
		instance.downloadTask.Reset()
	}
	instance.downloadTask.Start()
}

// callback when download task state changed
func (instance *Task) onDownloadStateChanged(task *downloader.Task) {

	switch task.GetStatus() {
	case downloader.Finished:
		instance.install(false)
	case downloader.Error:
		instance.onError(task.GetError(), "download error")
	}
}

func (instance *Task) onError(code int16, reason string) {

}

// function that installs the package
// @param restart: whether to restart the installation
func (instance *Task) install(restart bool) {
	instance.Status = INSTALL_STATE
	// call the package installer
}

func (instance *Task) Start() {
	instance.download(false)

}
