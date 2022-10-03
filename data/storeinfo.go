package data

type StoreInfo struct {
	Id          string                    `json:"id"`   // Store ID
	Name        string                    `json:"name"` // Store name
	Description string                    `json:"desc"` //Store Description
	Packages    map[string]PackagePreview `json:"packages"`
}
