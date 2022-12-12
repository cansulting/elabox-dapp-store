package data

type InstallDef struct {
	Id   string `json:"id"`
	Url  string `json:"url"`
	Icon string `json:"icon"`
	Name string `json:"name"`
}

type InstallParam struct {
	Definition   InstallDef   `json:"definition,omitempty"`
	Dependencies []InstallDef `json:"dependencies,omitempty"`
}
