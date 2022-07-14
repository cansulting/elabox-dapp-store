package main

import (
	"os"
	"store/backend/broadcast"
	"store/backend/global"
	"store/backend/services/store_lister"

	adata "github.com/cansulting/elabox-system-tools/foundation/app/data"
	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
)

var systemVersion = ""

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
	global.AppController.RPC.OnRecieved(global.CANCEL_PACKAGE, instance.rpc_oncancel)
	global.AppController.RPC.OnRecieved(global.RETRIEVE_SYS_VERSION, instance.rpc_onRetrieveSysVersion)
	return nil
}

// callback RPC
func (instance *StoreService) rpc_retrievePackages(client protocol.ClientInterface, action data.Action) string {
	dmap, _ := action.DataToMap()
	includeBeta := false
	if dmap["beta"] != nil && dmap["beta"].(bool) == true {
		includeBeta = true
	}
	apps, err := RetrieveAllApps(includeBeta)
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
func (instance *StoreService) rpc_oncancel(client protocol.ClientInterface, action data.Action) string {
	Cancel(action.PackageId)
	return rpc.CreateSuccessResponse("cancelled")
}

func (instance *StoreService) rpc_onRetrieveSysVersion(client protocol.ClientInterface, action data.Action) string {
	// load json file from SYS_INFO_PATH
	if systemVersion == "" {
		contents, err := os.ReadFile(global.SYS_INFO_PATH)
		if err != nil {
			return rpc.CreateResponse(rpc.SYSTEMERR_CODE, "unable to readfile "+err.Error())
		}
		pkg := adata.DefaultPackage()
		if err := pkg.LoadFromBytes(contents); err != nil {
			return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
		}
		systemVersion = pkg.Version
	}
	return rpc.CreateSuccessResponse(systemVersion)
}

func (instance *StoreService) IsRunning() bool {
	return true
}

func (instance *StoreService) OnEnd() error {
	return nil
}
