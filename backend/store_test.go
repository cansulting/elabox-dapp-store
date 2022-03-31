package main

import (
	"os"
	"store/backend/global"
	"store/backend/services/downloader"
	"store/backend/services/installer"
	"store/backend/services/store_lister"
	"strconv"
	"testing"
	"time"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

const TEST_PKG_PATH = "/../build/ela.sample/ela.sample.box"
const TEST_PKG = "ela.sample"

func Test_RetrieveListing(t *testing.T) {
	logger.Init("ela.store.test")
	// step: retrieve store listing
	if err := store_lister.RetrieveItems(); err != nil {
		t.Error("unable to retrieve store listing. inner: " + err.Error())
	}
}

// test for retrieving apps information and states
func Test_RetrieveAppsState(t *testing.T) {
	logger.Init("ela.store.test")
	pkgs, err := RetrieveAllApps()
	if err != nil {
		t.Error("unable to retrieve all installed packages. inner: " + err.Error())
		return
	}
	t.Log("retrieved all installed packages " + strconv.Itoa(len(pkgs)))
}

// test for retrieving specific app detailed information
func Test_RetrieveAppDetail(t *testing.T) {
	logger.Init("ela.store.test")
	pkgs, err := RetrieveAllApps()
	if err != nil {
		t.Error("unable to retrieve all installed packages. inner: " + err.Error())
		return
	}
	pkg := pkgs[0]
	pkgDetail, err := RetrieveApp(pkg.Id)
	if err != nil {
		t.Error("unable to retrieve app detail. inner: " + err.Error())
		return
	}
	t.Log("retrieved app detail: " + pkgDetail.Name)
}

// install app test
func Test_InstallPackage(t *testing.T) {
	logger.Init("ela.store.test")
	task := installer.CreateTask(TEST_PKG, "")
	handler, err := rpc.NewRPCHandlerDefault()
	global.RPC = handler
	if err != nil {
		t.Error("unable to create rpc handler. inner: " + err.Error())
		return
	}
	path, _ := os.Getwd()
	path += TEST_PKG_PATH
	if err := task.StartFromFile(path); err != nil {
		t.Error("unable to install package. inner: " + err.Error())
		return
	}
	time.Sleep(time.Second * 3)
}

// test for downloading app
func Test_DownloadPackage(t *testing.T) {
	logger.Init("ela.store.test")
	url := "https://storage.googleapis.com/elabox-staging/packages/6.box"
	savePath := "./sample.box"
	task := downloader.NewTask("sample", url, savePath)
	if err := task.Start(); err != nil {
		t.Error("unable to download package. inner: " + err.Error())
		return
	}
}
