package downloader

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

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

// contructor of download task
func NewTask(id string, url string, path string) *Task {
	return &Task{
		id:     id,
		url:    url,
		path:   path,
		status: 0,
	}
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
func (task *Task) Start() error {
	task.status = 1
	task.errorCode = 0
	err := task.Download(task.path, task.url)
	if err != nil {
		return err
	}
	fmt.Println("File Successfully Downloaded from", task.url)
	return nil
}

// download file via http
// save to file
func (task *Task) Download(path string, url string) (err error) {
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(path)
	if err != nil {
		return err
	}
	defer out.Close()

	// Check server response
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status: %s", resp.Status)
	}
	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}

func (task *Task) Stop() {
	task.status = 3
}

func (task *Task) Reset() {
	task.Stop()
	// clear cache file here
}
