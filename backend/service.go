package main

import (
	"store/backend/broadcast"
	"store/backend/services/store_lister"
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
	return nil
}

func (instance *StoreService) IsRunning() bool {
	return true
}

func (instance *StoreService) OnEnd() error {
	return nil
}
