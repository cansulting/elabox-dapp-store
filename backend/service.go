package main

import (
	"store/backend/broadcast"
	"store/backend/global"
	"store/backend/services/store_lister"

	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
)

type StoreService struct {
}

func (instance *StoreService) OnStart() error {
	if err := store_lister.Init(); err != nil {
		return err
	}
	if err := broadcast.Init(); err != nil {
		return err
	}

	// register service rpc
	global.AppController.RPC.OnRecieved(global.RETRIEVE_PACKAGES, instance.rpc_retrievePackages)
	global.AppController.RPC.OnRecieved(global.RETRIEVE_PACKAGE, instance.rpc_retrievePackage)
	global.AppController.RPC.OnRecieved(global.INSTALL_PACKAGE, instance.rpc_installPackage)
	global.AppController.RPC.OnRecieved(global.UNINSTALL_PACKAGE, instance.rpc_onuninstall)
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

func (instance *StoreService) rpc_onuninstall(client protocol.ClientInterface, action data.Action) string {
	err := UninstallApp(action.PackageId)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateSuccessResponse("started")
}

func (instance *StoreService) IsRunning() bool {
	return true
}

func (instance *StoreService) OnEnd() error {
	return nil
}
