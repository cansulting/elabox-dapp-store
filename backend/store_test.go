package main

import (
	"store/backend/services/store"
	"strconv"
	"testing"

	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func Test_RetrieveListing(t *testing.T) {
	logger.Init("ela.store.test")
	// step: retrieve store listing
	if err := store.RetrieveItems(); err != nil {
		t.Error("unable to retrieve store listing. inner: " + err.Error())
	}
}

func Test_RetrieveAllApps(t *testing.T) {
	logger.Init("ela.store.test")
	pkgs, err := RetrieveAllApps()
	if err != nil {
		t.Error("unable to retrieve all installed packages. inner: " + err.Error())
		return
	}
	t.Log("retrieved all installed packages " + strconv.Itoa(len(pkgs)))
}
