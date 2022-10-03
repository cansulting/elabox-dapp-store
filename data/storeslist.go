package data

type StoreList struct {
	Stores []StorePreview `json:"stores"`
}

// find store info index
func (instance *StoreList) FindIndexById(id string) int {
	for i := 0; i < len(instance.Stores); i++ {
		if instance.Stores[i].Id == id {
			return i
		}
	}
	return -1
}
