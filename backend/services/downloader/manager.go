package downloader

var downloadTasks = make(map[string]*Task)

func AddDownload(id string, url string) *Task {
	task := &Task{
		id:  id,
		url: url,
	}
	downloadTasks[id] = task
	task.onStateChanged = onTaskStateChanged
	task.onError = onTaskError
	task.Start()
	return task
}

func GetDownload(id string) *Task {
	return downloadTasks[id]
}

func RemoveDownload(id string) {
	delete(downloadTasks, id)
}

func onTaskStateChanged(task *Task) {
	// do something
}

func onTaskError(task *Task) {
	// do something
}
