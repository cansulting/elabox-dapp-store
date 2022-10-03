package data

type StorePreview struct {
	Id          string `json:"id"`      // Store ID
	Name        string `json:"name"`    // Store name
	Description string `json:"desc"`    //Store Description
	IconCID     string `json:"iconcid"` //Store Icon
	StoreCID    string `json:"storecid"`
}

// replace the original info with new values
func ReplaceStoreInfo(original *StorePreview, new StorePreview) {
	if new.Description != "" {
		original.Description = new.Description
	}
	if new.IconCID != "" {
		original.IconCID = new.Description
	}
	if new.Id != "" {
		original.Id = new.Id
	}
	if new.Name != "" {
		original.Name = new.Name
	}
	if new.StoreCID != "" {
		original.StoreCID = new.StoreCID
	}
}
