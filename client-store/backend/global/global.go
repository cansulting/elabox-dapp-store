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
const INSTALLER_STATE_CHANGE = "ela.installer.broadcast.STATE_CHANGED"
const INSTALLER_ERROR = "ela.installer.broadcast.ERROR"

// store actions
const RETRIEVE_PACKAGES = "ela.store.actions.RETRIEVE_PACKAGES"
const RETRIEVE_PACKAGE = "ela.store.actions.RETRIEVE_PACKAGE"
const INSTALL_PACKAGE = "ela.store.actions.INSTALL_PACKAGE"
const UNINSTALL_PACKAGE = "ela.store.actions.UNINSTALL_PACKAGE"
const CANCEL_INSTALL_PACKAGE = "ela.store.actions.CANCEL_INSTALL_PACKAGE"
const UPDATE_AVAILABLE = "ela.store.broadcast.UPDATE_AVAILABLE"
const INSTALL_PROGRESS = "ela.store.broadcast.INSTALL_PROGRESS"
const BROADCAST_ERROR = "ela.store.broadcast.ERROR"
const INSTALL_STATE = "ela.store.broadcast.INSTALL_STATE"
const RETRIEVE_SYS_VERSION = "ela.store.actions.RETRIEVE_SYSTEM_VERSION"
const CHECK_IF_PACKAGE_IS_DEPENDENCY = "ela.store.actions.CHECK_IF_PACKAGE_IS_DEPENDENCY"

// account actions
const ACCOUNT_PACKAGE_ID = "ela.account"
const AC_DEVICE_SERIAL = "account.actions.DEVICE_SERIAL" //use to get device serial

const SYS_INFO_PATH = "/usr/ela/system/ela.system/info.json"

// CACHES
const IMAGES_CACHE_PATH = "/_images" // cache path for all package images
const STORE_CACHE_PATH = CacheDir + "/stores.cache"
const STOREHUB_CACHE_PATH = CacheDir + "/storehub.cache"
