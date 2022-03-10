// this class is used to manage the installation of the application.
// This class utilizes the scheduler for queued installation

package installer

import "store/backend/global"

var tasklist = make(map[string]*Task)

func CreateTask(packge string, downloadLink string) *Task {
	task := GetTask(packge)
	if task != nil {
		return task
	}

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
	task.Start()
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
	// if failed in installing, then remove the task from schedule
	if task.Status == global.Installing {
		finishCurrentSchedule()
	}
}
