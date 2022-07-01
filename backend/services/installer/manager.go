// this class is used to manage the installation of the application.
// This class utilizes the scheduler for queued installation

package installer

import (
	"store/backend/broadcast"
	"store/backend/global"

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

func CreateTask(packge string, downloadLink string) *Task {
	initialize()
	task := GetTask(packge)
	if task == nil {
		task = &Task{
			Id:        packge,
			Url:       downloadLink,
			Status:    global.UnInstalled,
			ErrorCode: 0,
		}
		tasklist[packge] = task

		// step: if this task finished downloading, then add to install queue
		task.OnStateChanged = func(task *Task) {
			switch task.Status {
			case global.Downloaded:
				addToSchedule(task)
			case global.Installed:
				RemoveTask(task.Id)
			}
		}
		task.OnErrCallback = func(code int16, reason string) {
			onTaskError(task, code, reason)
		}
	}
	if downloadLink != "" {
		task.Url = downloadLink
	}
	//task.Start()
	return task
}

func GetTask(packge string) *Task {
	if task, ok := tasklist[packge]; ok {
		return task
	}
	return nil
}

func RemoveTask(packge string) {
	task := GetTask(packge)
	if task == nil {
		return
	}
	task.onDestroy()
	delete(tasklist, packge)
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
