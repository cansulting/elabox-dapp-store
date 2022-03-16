// callback when recieved broadcast actions

package broadcast

import (
	"store/backend/global"
	"store/backend/services/installer"

	"github.com/cansulting/elabox-system-tools/foundation/event/data"
	"github.com/cansulting/elabox-system-tools/foundation/event/protocol"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

var lastInstallingPkg *installer.Task

// register broadcast recievers
func registerRecievers() error {
	// register for
	if err := global.AppController.RPC.OnRecievedFromPackage(
		global.InstallerId,
		global.INSTALLER_PROGRESS,
		onRecievedInstallerProgress); err != nil {
		return err
	}
	return nil
}

// callback from installer when it's progress changed
func onRecievedInstallerProgress(client protocol.ClientInterface, action data.Action) string {
	// step: parse data
	dataAc, err := action.DataToMap()
	if err != nil {
		logger.GetInstance().Error().Caller().Err(err).Msg("failed to parse action data")
		return ""
	}
	currentPackage, ok := dataAc["packageId"].(string)
	if !ok || currentPackage == "" {
		logger.GetInstance().Error().Caller().Msg("packageId is not string")
		return ""
	}
	progress, ok := dataAc["progress"].(float64)
	if !ok {
		logger.GetInstance().Error().Caller().Msg("failed to parse progress")
		return ""
	}
	// step: check if the package is the same as the last installing package
	if lastInstallingPkg == nil || currentPackage != lastInstallingPkg.Id {
		task := installer.GetTask(currentPackage)
		if task == nil {
			logger.GetInstance().Error().Msg("installer task not found for " + currentPackage)
			return ""
		}
		lastInstallingPkg = task
	}
	// step: update package progress
	lastInstallingPkg.SetInstallProgress(int16(progress))
	return ""
}
