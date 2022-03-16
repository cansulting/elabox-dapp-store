package global

import (
	"github.com/cansulting/elabox-system-tools/foundation/app"
	"github.com/cansulting/elabox-system-tools/foundation/app/rpc"
	"github.com/cansulting/elabox-system-tools/foundation/path"
)

const PackageId = "ela.store"
const InstallerId = "ela.installer"
const CacheDir = path.PATH_SYSTEM_DATA + "/" + PackageId + "/cache"
const StoreCache = CacheDir + "/packages.cache"
const DownloadCache = CacheDir + "/downloads"

var AppController *app.Controller
var RPC *rpc.RPCHandler

// installer actions
const INSTALLER_PROGRESS = "ela.installer.broadcast.PROGRESS"

// store actions
const RETRIEVE_PACKAGES = "ela.store.actions.RETRIEVE_PACKAGES"
const RETRIEVE_PACKAGE = "ela.store.actions.RETRIEVE_PACKAGE"
