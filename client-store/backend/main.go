package main

import (
	"github.com/cansulting/elabox-system-tools/foundation/app"
	"github.com/cansulting/elabox-system-tools/foundation/logger"
)

func main() {
	logger.Init(PACKAGE_ID)
	con, err := app.NewController(nil, &StoreService{})
	if err != nil {
		logger.GetInstance().Error().Err(err).Msg("failed to initialize controller")
	}
	app.RunApp(con)
}
