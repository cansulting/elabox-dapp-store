package main

import (
	"store/backend/services/store"
	"time"
)

func main() {
	if err := store.Init(); err != nil {
		panic(err)
	}
	// keep running
	for {
		time.Sleep(time.Second * 3)
	}
}
