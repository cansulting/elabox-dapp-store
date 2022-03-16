package main

import (
	"store/backend/broadcast"
	"store/backend/global"
	"store/backend/services/installer"
	"store/backend/services/store_lister"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

var lastInstallingPkg *installer.Task

type StoreService struct {
}

func (instance *StoreService) OnStart() error {
	if err := store_lister.Init(); err != nil {
		return err
	}
	if err := broadcast.Init(); err != nil {
		return err
	}

	broadcast.OnInstallerProgress = instance.OnInstallerProgress

	// register service rpc
	global.AppController.RPC.OnRecieved(global.RETRIEVE_PACKAGES, instance.rpc_retrievePackages)
	global.AppController.RPC.OnRecieved(global.RETRIEVE_PACKAGE, instance.rpc_retrievePackage)
	global.AppController.RPC.OnRecieved(global.INSTALL_PACKAGE, instance.rpc_installPackage)
	return nil
}

// callback RPC
func (instance *StoreService) rpc_retrievePackages(client protocol.ClientInterface, action data.Action) string {
	apps, err := RetrieveAllApps()
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateJsonResponse(rpc.SUCCESS_CODE, apps)
}

func (instance *StoreService) rpc_retrievePackage(client protocol.ClientInterface, action data.Action) string {
	app, err := RetrieveApp(action.PackageId)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateJsonResponse(rpc.SUCCESS_CODE, app)
}

func (instance *StoreService) rpc_installPackage(client protocol.ClientInterface, action data.Action) string {
	err := DownloadInstallApp(action.PackageId)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateSuccessResponse("started")
}

// callback from installer progress
func (instance *StoreService) OnInstallerProgress(packageId string, progress float64) {
	// step: check if the package is the same as the last installing package
	if lastInstallingPkg == nil || packageId != lastInstallingPkg.Id {
		task := installer.GetTask(packageId)
		if task == nil {
			logger.GetInstance().Error().Msg("installer task not found for " + packageId)
			return
		}
		lastInstallingPkg = task
	}
	// step: update package progress
	lastInstallingPkg.SetInstallProgress(int16(progress))
}

func (instance *StoreService) IsRunning() bool {
	return true
}

func (instance *StoreService) OnEnd() error {
	return nil
}
