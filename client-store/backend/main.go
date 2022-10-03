package main

import (
	"store/client-store/backend/global"

	"github.com/cansulting/elabox-system-tools/foundation/app"
)

func main() {

	con, err := app.NewController(nil, &StoreService{})
	if err != nil {
		panic(err)
	}
	global.RPC = con.RPC
	global.AppController = con
	app.RunApp(con)
}
