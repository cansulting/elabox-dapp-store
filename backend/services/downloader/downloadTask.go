package downloader

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"store/backend/global"
	"strconv"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

// struct that handles the download task
type Task struct {
	id                string
	url               string           // url to download
	path              string           // path to save the file
	downloaded        int64            // downloaded size
	total             int64            // total size
	progress          int16            // the current progress of download. 100 mean fully downloaded
	status            Status           // the current status of download. 0 mean idle, 1 mean downloading, 2 mean paused, 3 mean stopped
	errorCode         int16            // the error code of download. 0 mean no error, 1 mean network error, 2 mean file error
	OnStateChanged    func(task *Task) // callback event when status was changed
	OnProgressChanged func(task *Task) // callback event when progress was changed
	OnError           func(task *Task) // callback event when recieved error
}

// contructor of download task
func NewTask(id string, url string, savePath string) *Task {
	return &Task{
		id:                id,
		url:               url,
		path:              savePath,
		status:            0,
		OnProgressChanged: func(task *Task) {},
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
	if task.status == 1 {
		logger.GetInstance().Warn().Msg(task.id + " is already downloading")
		return nil
	}

	task._onStateChanged(Downloading)
	task.errorCode = 0
	err := task.Download(task.path, task.url)
	if err != nil {
		task._onStateChanged(Error)
		return err
	}
	return nil
}

// download file via http
// save to file
func (task *Task) Download(path string, url string) (err error) {
	task.downloaded = 0
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return errors.New("http status code " + resp.Status)
	}

	task.total, err = strconv.ParseInt(resp.Header.Get("Content-Length"), 10, 64)
	if err != nil || task.total == 0 {
		return errors.New("failed to get content length")
	}

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
	if task.OnProgressChanged != nil {
		_, err = io.Copy(out, io.TeeReader(resp.Body, task))
	} else {
		_, err = io.Copy(out, resp.Body)
	}
	if err != nil {
		return err
	}
	//finish successfully
	task._onStateChanged(Finished)
	return nil
}

func (task *Task) Stop() {
	task.status = 3
}

func (task *Task) Reset() {
	task.Stop()
	// clear cache file here
}

func (task *Task) _onStateChanged(status Status) {
	task.status = status
	if task.OnStateChanged != nil {
		task.OnStateChanged(task)
	}
}

// callback when writing the download file
func (task *Task) Write(p []byte) (n int, err error) {
	l := len(p)
	task.downloaded += int64(l)
	task.progress = int16((float32(task.downloaded) / float32(task.total)) * 100)
	if global.ENV == "debug" {
		println("progress:", task.progress)
	}
	task.OnProgressChanged(task)
	return n, nil
}
