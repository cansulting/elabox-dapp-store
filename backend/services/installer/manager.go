// this class is used to manage the installation of the application.
// This class utilizes the scheduler for queued installation

package installer

import (
	"store/backend/broadcast"
	"store/backend/global"
	"store/backend/services/store_lister"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

var tasklist = make(map[string]*Task)
var isInit = false
var lastInstallingPkg *Task

// initialize listeners
func initialize() {
	if isInit {
		return
	}
	isInit = true
	// update package status based on installer changes
	broadcast.OnInstallerError = func(pkid string, code int, message string) {
		finishCurrentSchedule()
	}
	broadcast.OnInstallerStateChanged = func(pkid string, installStatus broadcast.PkInstallerState) {
		if installStatus == broadcast.INSTALLED {
			task := GetTask(pkid)
			task.onInstalledFinished()
			finishCurrentSchedule()
		} else if installStatus == broadcast.UNINSTALLED {
			task := GetTask(pkid)
			task.setStatus(global.UnInstalled)
			finishCurrentSchedule()
		}
	}
	// callback from installer progress
	broadcast.OnInstallerProgress = func(packageId string, progress int) {
		// step: check if the package is the same as the last installing package
		if lastInstallingPkg == nil || packageId != lastInstallingPkg.Id {
			task := GetTask(packageId)
			if task == nil {
				logger.GetInstance().Error().Msg("installer task not found for " + packageId)
				return
			}
			lastInstallingPkg = task
		}
		// step: update package progress
		lastInstallingPkg.SetInstallProgress(int16(progress))
	}

}

func CreateUninstallTask(pkg string) *Task {
	return CreateTask(pkg, "", nil)
}

// use to create install task
// @pkg: install task for which package.
// @downloadLink: where the package file will be downloaded
func CreateInstallTask(pkg string, downloadLink string) (*Task, error) {
	if downloadLink == "" {
		var err error
		downloadLink, err = store_lister.RetrieveDownloadLink(pkg)
		if err != nil {
			return nil, err
		}
	}
	item, err := store_lister.GetItem(pkg)
	if err != nil {
		logger.GetInstance().Error().Err(err).Msg("failed to retrieve item " + pkg)
		return nil, err
	}
	return CreateTask(pkg, downloadLink, item.Dependencies), nil
}

// use to create install task
// @pkg: install task for which package.
// @downloadLink: where the package file will be downloaded
func CreateTask(pkg string, downloadLink string, dependencies []string) *Task {
	initialize()
	task := GetTask(pkg)
	if task == nil {
		task = &Task{
			Id:           pkg,
			Url:          downloadLink,
			Status:       global.UnInstalled,
			ErrorCode:    0,
			Dependencies: dependencies,
			installing:   false,
		}
		tasklist[pkg] = task

		// step: if this task finished downloading, then add to install queue
		task.OnStateChanged = func(task *Task) {
			switch task.Status {
			case global.Downloaded:
				addToSchedule(task)
			case global.Installed:
				RemoveTask(task.Id)
			}
		}
		// step: if this task got an error, then call error handler
		task.OnErrCallback = func(code int16, reason string) {
			onTaskError(task, code, reason)
		}
	} else {
		task.Dependencies = dependencies
	}
	if downloadLink != "" {
		task.Url = downloadLink
	}
	//task.Start()
	return task
}

func GetTask(pkg string) *Task {
	if task, ok := tasklist[pkg]; ok {
		return task
	}
	return nil
}

func RemoveTask(pkg string) {
	task := GetTask(pkg)
	if task == nil {
		return
	}
	task.onDestroy()
	delete(tasklist, pkg)
}

// callback when error found in task
// @param code the error code
// @param reason the error reason
func onTaskError(task *Task, code int16, reason string) {
	broadcast.PublishError(task.Id, int(code), reason)
	// if failed in installing, then remove the task from schedule
	if task.Status == global.Installing {
		finishCurrentSchedule()
	}
}
