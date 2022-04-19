package data

// type that represents a package from store server listing
type PackageListingCache struct {
	Id    string `json:"id"`   // Package ID
	Name  string `json:"name"` // Package name
	Icon  string `json:"icon"` // Package icon
	Build int    `json:"build"`
	// extra details
	Version        string `json:"version"`
	Description    string `json:"description"`
	Updates        string `json:"updates"`
	ProjectRepo    string `json:"projectRepo"`
	ProjectWebsite string `json:"projectWebsite"`
	Category       string `json:"category"`
	MinRuntime     string `json:"minRuntime"` // minimum runtime required to run this package, val <= 0 means it can run on any runtime
}

// load details from cache file
// func (instance PackageListingCache) LoadDetails() (bool, error) {
// 	pkgCache := global.CacheDir + "/" + instance.Id
// 	if _, err := os.Stat(pkgCache); err != nil {
// 		return false, nil
// 	}
// 	contents, err := os.ReadFile(pkgCache)
// 	if err != nil {
// 		return false, errors.New("unable to read cache file " + pkgCache)
// 	}
// 	err = json.Unmarshal(contents, &instance)
// 	if err != nil {
// 		return false, errors.New("unable to unmarshal cache file " + pkgCache)
// 	}
// 	return true, nil
// }
