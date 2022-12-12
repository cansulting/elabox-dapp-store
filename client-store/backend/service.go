package main

import (
	"os"
	"store/client-store/backend/broadcast"
	data2 "store/client-store/backend/data"
	"store/client-store/backend/global"
	"store/client-store/backend/services/store_lister"
	"store/client-store/backend/services/storehub"

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
	global.AppController.RPC.OnRecieved(global.CANCEL_INSTALL_PACKAGE, instance.rpc_oncancelinstall)
	global.AppController.RPC.OnRecieved(global.RETRIEVE_SYS_VERSION, instance.rpc_onRetrieveSysVersion)
	global.AppController.RPC.OnRecieved(global.CHECK_IF_PACKAGE_IS_DEPENDENCY, instance.rpc_oncheckifdependency)
	//go RetrieveAllApps(false)
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
	app, err := RetrieveApp(action.PackageId, "")
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateJsonResponse(rpc.SUCCESS_CODE, app)
}

// recieved request that will install the package.
func (instance *StoreService) rpc_installPackage(client protocol.ClientInterface, action data.Action) string {
	// installType := storedata.Production
	// if val, err := action.DataToMap(); err != nil {
	// 	if val["type"] != nil {
	// 		installType = storedata.ReleaseType(val["type"].(int))
	// 	}
	// }
	info, err := storehub.RetrieveApp(action.PackageId, "")
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	// TODO: install dependencies

	// send install request to package manager
	rpcres, err := global.AppController.RPC.CallRPC(
		global.PackageManagerId,
		data.NewAction(
			global.PKMG_INSTALL_PACKAGE,
			"",
			data2.InstallParam{
				Definition: data2.InstallDef{
					Id:   action.PackageId,
					Icon: info.IconCID,
					Name: info.Name,
					Url:  info.Release.Production.Build.IpfsCID,
				},
			}))
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, "failed sending request to package manager, "+err.Error())
	}
	return rpcres.Value.(string)
	//res, err := rpcres.ToSimpleResponse()
	//println(res.Message)
	//return rpc.CreateSuccessResponse("started")
}

func (instance *StoreService) rpc_onuninstall(client protocol.ClientInterface, action data.Action) string {
	_, err := global.AppController.RPC.CallRPC(global.PackageManagerId, action)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateSuccessResponse("started")
}
func (instance *StoreService) rpc_oncancelinstall(client protocol.ClientInterface, action data.Action) string {
	_, err := global.AppController.RPC.CallRPC(global.PackageManagerId, action)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateSuccessResponse("cancelled")
}

func (insstance *StoreService) rpc_oncheckifdependency(client protocol.ClientInterface, action data.Action) string {
	isDependent, err := HasDependencies(action.PackageId)
	if err != nil {
		return rpc.CreateResponse(rpc.INVALID_CODE, err.Error())
	}
	return rpc.CreateJsonResponse(rpc.SUCCESS_CODE, isDependent)
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
