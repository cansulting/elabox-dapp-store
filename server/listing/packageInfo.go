package listing

type PackageInfo struct {
	Id              string   `json:"id"`   // Package ID
	Name            string   `json:"name"` // Package name
	Icon            string   `json:"icon"` // Package icon
	Build           int      `json:"build"`
	Version         string   `json:"version"`
	Description     string   `json:"description"`
	Updates         string   `json:"updates"`
	ProjectRepo     string   `json:"projectRepo"`
	ProjectWebsite  string   `json:"projectWebsite"`
	Category        string   `json:"category"`   // If system then it is a system package and cannot be uninstalled
	MinRuntime      string   `json:"minRuntime"` // minimum runtime required to run this package, val <= 0 means it can run on any runtime
	Beta            bool     `json:"beta"`
	BetaUsers       []string `json:"betaUsers,omitempty"` //list of beta users
	Dependencies    []string `json:"dependencies"`        // list of package ids where this package is dependent to
	OperatingSystem string   `json:"os,omitempty"`        // os it supports
}
