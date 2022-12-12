package main

import (
	"strconv"
	"testing"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

const TEST_PKG_PATH = "/../build/ela.sample/ela.sample.box"
const TEST_PKG = "ela.sample"

func Test_RetrieveListing(t *testing.T) {
	logger.Init("ela.store.test")
	// step: retrieve store listing
	// if err := store_lister.CheckUpdates(); err != nil {
	// 	t.Error("unable to retrieve store listing. inner: " + err.Error())
	// }
}

// test for retrieving apps information and states
func Test_RetrieveAppsState(t *testing.T) {
	logger.Init("ela.store.test")
	pkgs, err := RetrieveAllApps(true)
	if err != nil {
		t.Error("unable to retrieve all installed packages. inner: " + err.Error())
		return
	}
	t.Log("retrieved all installed packages " + strconv.Itoa(len(pkgs)))
}

// test for retrieving specific app detailed information
func Test_RetrieveAppDetail(t *testing.T) {
	logger.Init("ela.store.test")
	pkgs, err := RetrieveAllApps(true)
	if err != nil {
		t.Error("unable to retrieve all installed packages. inner: " + err.Error())
		return
	}
	pkg := pkgs[0]
	pkgDetail, err := RetrieveApp(pkg.Id, "")
	if err != nil {
		t.Error("unable to retrieve app detail. inner: " + err.Error())
		return
	}
	t.Log("retrieved app detail: " + pkgDetail.Name)
}
