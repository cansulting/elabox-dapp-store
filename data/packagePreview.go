package data

type ReleaseType uint

const (
	Development = 0
	Beta        = 1
	Production  = 2
)

type BuildInfo struct {
	Id           string   `json:"id"`
	Number       uint     `json:"number"`
	IpfsCID      string   `json:"ipfsCID"`
	MinRuntime   string   `json:"minRuntime"`
	Dependencies []string `json:"dependencies"`
}

type ReleaseInfo struct {
	Description string      `json:"desc"`
	Build       BuildInfo   `json:"build"`
	ReleaseType ReleaseType `json:"type"`
	Version     string      `json:"version"`
}

type TesterInfo struct {
	Users []string `json:"users"`
}

type PackagePreview struct {
	Id          string      `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"desc"`
	Release     ReleaseInfo `json:"release"`
	Tester      TesterInfo  `json:"tester"`
}
