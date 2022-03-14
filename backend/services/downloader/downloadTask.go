package downloader

// struct that handles the download task
type Task struct {
	id                string
	url               string           // url to download
	path              string           // path to save the file
	progress          int16            // the current progress of download. 100 mean fully downloaded
	status            Status           // the current status of download. 0 mean idle, 1 mean downloading, 2 mean paused, 3 mean stopped
	errorCode         int16            // the error code of download. 0 mean no error, 1 mean network error, 2 mean file error
	OnStateChanged    func(task *Task) // callback event when status was changed
	OnProgressChanged func(task *Task) // callback event when progress was changed
	OnError           func(task *Task) // callback event when recieved error
}

func (task *Task) GetUrl() string {
	return task.url
}

func (task *Task) GetPath() string {
	return task.path
}

func (task *Task) GetProgress() int16 {
	return task.progress
}

// function that returns the current status of download
func (task *Task) GetStatus() Status {
	return task.status
}

// function that returns error info
func (task *Task) GetError() int16 {
	return task.errorCode
}

// function that starts the download task
func (task *Task) Start() {
	task.status = 1
	task.errorCode = 0
	// download file via http
	// save to file
}

func (task *Task) Stop() {
	task.status = 3
}

func (task *Task) Reset() {
	task.Stop()
	// clear cache file here
}