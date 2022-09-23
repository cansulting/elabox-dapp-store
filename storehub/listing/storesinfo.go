package listing

type StoresInfo struct {
	Stores []StoreInfo `json:"stores"`
}

// find store info index
func (instance *StoresInfo) findIndexById(id string) int {
	for i := 0; i < len(instance.Stores); i++ {
		if instance.Stores[i].Id == id {
			return i
		}
	}
	return -1
}
