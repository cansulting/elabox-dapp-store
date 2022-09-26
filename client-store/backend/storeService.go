package main

type StoreService struct {
}

func (instance *StoreService) IsRunning() bool {
	return true
}

func (instance *StoreService) OnStart() error {
	return nil
}

func (instance *StoreService) OnEnd() error {
	return nil
}
